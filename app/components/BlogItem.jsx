import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { Comment, Icon, Tooltip, Avatar, Modal, Button, message, Form, Input, Divider, Row, Col } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux'
import axios from 'axios';
import APIS from '../api/index';
import { likeBlog, disslikeBlog, delBlog, saveReply, hasMoreBlogItem, initBlogs, isShowLoading } from '../store/actions'

import BlogTag from './parts/BlogTag'

import { get_uuid } from '../utils/commUtils'



require('../assets/styles/BlogItem.scss')

const TextArea = Input.TextArea;

class BlogItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            // dislikes: 0,
            action: '',
            item: props.item, //将父组件props传给子组件state,
            delCurrentId: '',
            showReply: false,
            loading: false,
            replyText: null,
            showDelModal: false,
            confirmLoading: false,
            hasImage: false
        }
    }

    componentDidMount() {
        //通过正则表达式获取 htmlDom中的图片地址
        //参考资料https://blog.csdn.net/zb219/article/details/25380867
        let imgStr = this.state.item.htmlDom
        if (imgStr.match(/<img src="(\S*)"/)) {
            this.setState({ hasImage: true })
            this.setState({ firstImgUrl: this.state.item.htmlDom.match(/src=(\S*)"/)[1].replace("\"", '') }) //去掉双引号
        }
        if (this.props.location.pathname.includes('myblog')) {
            this.setState({ type: 'myblog' })
        }
    }


    // 初始化数据封装在子组件的点击事件中
    initTagBlog = (tag) => {
        this.props.dispatch(hasMoreBlogItem(true))
        this.props.dispatch(isShowLoading(true)) //全局显示loading
        //加载页面数据
        let url = APIS.blogListByTag.devUrl + '?pageIndex=1&pageSize=10&tag=' + tag
        axios.get(url).then(res => {
            this.props.dispatch(initBlogs(res.data, true))
            this.props.dispatch(isShowLoading(false))
            if (this.props.store.blogs.length > 0) {

            }
            else {
                message.warning('server err!!!')
            }
        }).catch(err => {
            console.log(err)
        })
    }


    like = () => {
        if (this.props.store.isLogin.login === true) {
            //如果已经点赞
            if ((this.state.item.likes.includes(this.props.store.isLogin.userName) === true || this.state.action === 'liked')) {
                this.setState({
                    likes: this.state.likes - 1,
                    action: '',
                    item: { ...this.state.item, likes: this.state.item.likes.filter(item => item !== this.props.store.isLogin.userName) }//复制对象,object.assign的另一种写法
                    //Object.assign()赋值对象
                    //item: Object.assign(this.state.item, { ...this.state.item, likes: this.state.item.likes.filter(item => item !== this.props.store.isLogin.userName) })
                })
                this.props.dispatch(disslikeBlog(this.state.item.id, this.props.store.isLogin.userName))
                axios({
                    method: 'post',
                    url: APIS.disslikeBlogItem.devUrl,
                    headers: {
                        // 'Content-type': 'application/x-www-form-urlencoded' 
                        'Content-type': 'application/json'
                    },
                    data: {
                        blogId: this.state.item.id,
                        name: this.props.store.isLogin.userName
                    }
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                return
            }
            //如果没有点赞
            else {
                this.setState({ action: 'liked', likes: this.state.likes + 1 })
                this.props.dispatch(likeBlog(this.state.item.id, this.props.store.isLogin.userName))

                axios({
                    method: 'post',
                    url: APIS.likeBlogItem.devUrl,
                    headers: {
                        // 'Content-type': 'application/x-www-form-urlencoded'
                        'Content-type': 'application/json'
                    },
                    data: {
                        blogId: this.state.item.id,
                        name: this.props.store.isLogin.userName
                    }
                }).then((res) => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }

        }
        else {
            message.warning('plz login first!')
            return
        }
    }

    // dislike = () => {
    //     alert(this.state.item.id)
    // }

    //删除btn点击事件，将id绑定到state
    handleDel = (id) => {
        console.log('itemId:', id)
        this.setState({ delCurrentId: id, showDelModal: true })

    }


    //确认删除 ==> 将id post 到 backend
    confirmDel = () => {
        this.setState({ confirmLoading: true })
        let delUrl = APIS.deleteBlog.devUrl
        axios({
            method: 'post',
            url: delUrl,
            headers: {
                // 'Content-type': 'application/x-www-form-urlencoded'
                'Content-type': 'application/json'
            },
            data: {
                blogId: this.state.delCurrentId
            }
        }).then(res => {
            console.log('server res==>', res)
            this.props.dispatch(delBlog(this.state.delCurrentId))
            message.success('delete success!')
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            this.setState({ showDelModal: false, confirmLoading: false })
        })
    }
    cancelDel = () => {
        this.setState({ showDelModal: false })
    }

    //提交回复
    handleOk = () => {
        let replyId = get_uuid()

        if (!this.state.replyText) {
            message.warning('reply can\'t not be null!!!')
            return
        }
        this.setState({ loading: true });
        console.log('BlogItem ==>', this.state.item)
        axios({
            method: 'post',
            url: APIS.saveBlogReply.devUrl,
            headers: {
                // 'Content-type': 'application/x-www-form-urlencoded'
                'Content-type': 'application/json'
            },
            data: {
                id: replyId,
                blogId: this.state.item.id,
                name: this.props.store.isLogin.userName,
                avatarUrl: this.props.store.isLogin.avatarUrl,
                replyText: this.state.replyText
            }
        }).then(res => {
            console.log(res)
            //添加到store中的BlogList
            this.props.dispatch(saveReply(replyId, this.state.item.id, this.state.replyText, this.props.store.isLogin.userName, this.props.store.isLogin.avatarUrl))
            this.setState({ loading: false, showReply: false });
        }).catch(err => {
            console.log(err)
        })
    }
    //取消回复对话框
    handleCancel = () => {
        this.setState({ showReply: false });
    }

    showReplyMoadl = () => {
        if (this.props.store.isLogin.login === false) {
            message.warning('plz login first!!!')
            return
        }
        this.setState({ showReply: true, replyText: null })
    }

    onChangeReply = (e) => {
        this.setState({ replyText: e.target.value })
        console.log(this.state.replyText)
    }

    handleLink = () => {
        this.props.history.push({
            pathname: '/app/blogall/blogdetail/' + this.state.item.id,
            state: { type: this.props.type, htmlDom: this.state.item.htmlDom }
        }
        )
        // this.props.history.push({
        //     pathname: '/blogdetail/' + this.state.item.id,
        //     state: { type: this.props.type },
        // })
        // let win = window.open('/app/blogall/blogdetail/', '_blank');
        // win.focus();

    }



    render() {

        const { action } = this.state;

        const actions = [
            <span>
                <Tooltip title="Like">
                    <Icon
                        type="like"
                        //如果 用户曾经点过赞(历史点赞记录)   或者  用户这一次点赞（本次行为，调用 like() 方法 中的 setState({action:'liked'})     
                        theme={(this.state.item.likes.includes(this.props.store.isLogin.userName) === true || action === 'liked' === true) === true ? 'filled' : 'outlined'}
                        onClick={this.like}
                    />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                    {this.props.item.likes.length}
                </span>
            </span>,

            // ----------------隐藏【回复控件】---------------------
            // <span onClick={this.showReplyMoadl}>Reply to</span>,
            <span>Replys&nbsp;:&nbsp;{this.state.item.replys.length}</span>
        ];
        return (
            < div className="wapper">
                <Divider />
                <div key={this.state.item.id} style={{ marginLeft: '30px' }}>
                    <Row>
                        <Col span={this.state.hasImage === true ? '18' : '23'}>
                            <Comment key={this.state.item.id}
                                actions={actions}
                                author={this.state.item.user}
                                avatar={(<Avatar src={this.state.item.avatarUrl} alt={this.state.item.user} />)}
                                content={(
                                    <div className="commentItem">
                                        {/* title 链接 */}
                                        {/* <Link
                                    target="_blank"
                                    className="blogTitle"
                                    to={{
                                        pathname: '/app/blogall/blogdetail/' + this.state.item.id,
                                        state: { type: this.props.type },
                                        queryquery: { id: this.state.item.id }
                                    }}
                                > {this.state.item.title}</Link> */}
                                        <a onClick={this.handleLink} className="blogTitle">
                                            {this.state.item.title}
                                        </a>

                                        {/* blog内容 */}
                                        <div className="blogText">{this.state.item.text}</div>

                                        {/* tags */}
                                        <div style={{ marginTop: '5px' }}>
                                            {this.state.item.tags.map(item => {
                                                return <div key={item} style={{ marginRight: '5px', display: 'inline' }} onClick={this.initTagBlog.bind(this, item)}><BlogTag tag={item} /> </div>
                                            })}
                                        </div>
                                    </div>
                                )}
                                datetime={(
                                    <Tooltip title={moment(this.state.item.date).format('LLLL')}>
                                        <span>{moment(this.state.item.date).fromNow()}</span>
                                    </Tooltip>
                                )}
                            />
                        </Col>
                        <Col span={this.state.hasImage === true ? "5" : "0"}>
                            <div className="div">
                                {this.state.hasImage === true ? <img src={this.state.firstImgUrl} /> : null}
                            </div>
                        </Col>
                        <Col span={1}>
                            {/* 如果是myBlogs页面则显示 delBtn */}
                            {this.state.type === "myblog" ? <div id="delBtn" onClick={this.handleDel.bind(this, this.state.item.id)}>&times;</div> : null}
                        </Col>
                    </Row>
                    {/*--------------回复内容--------ps：此处隐藏，在blogDetail页面中显示*/}
                    {/* {replysInStore.length === 0 ? null : replysInStore.map(replyItem => {
                        return <Comment style={{ marginLeft: '40px', marginRight: '20px', marginTop: '-15px' }}
                            key={replyItem.id}
                            author={replyItem.user}
                            avatar={(<Avatar src={replyItem.avatarUrl} alt={replyItem.user} />)}
                            content={replyItem.replyText}
                        />
                    })} */}

                    {/*Reply模态框*/}
                    <div>
                        <Modal visible={this.state.showReply}
                            title="Reply"
                            onOk={this.confirmDel}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" onClick={this.handleCancel}>Return</Button>,
                                <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                                    Submit
                            </Button>,
                            ]}
                        >
                            <div>
                                <Form.Item>
                                    <TextArea rows={4} onChange={this.onChangeReply} value={this.state.replyText} />
                                </Form.Item>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div>
                    <Modal
                        title="Delete Blog"
                        visible={this.state.showDelModal}
                        onOk={this.confirmDel}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.cancelDel}
                    >
                        <p className="delWarning">&nbsp;&nbsp; <Icon type="warning" theme="twoTone" twoToneColor="#FAAD14" />&nbsp;&nbsp;Are you sure want to delete this Blog?</p>
                    </Modal>
                </div>
            </div >
        )
    }
}
let mapStateToProps = (state) => {
    return {
        store: state
    }
};

export default withRouter(connect(mapStateToProps)(BlogItem))