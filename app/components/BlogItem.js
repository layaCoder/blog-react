import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Comment, Icon, Tooltip, Avatar, Modal, Button, DatePicker, Row, Col, Skeleton, Pagination, message, Popconfirm, Tag } from 'antd';

import { Route, Link, Switch } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux'

import axios from 'axios';
import APIS from '../api/index';
import { likeBlog, disslikeBlog, delBlog } from '../store/actions'
import BlogTag from './parts/BlogTag'



require('../assets/styles/BlogItem.css')

class BlogItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            // dislikes: 0,
            action: '',
            item: props.item, //将父组件props传给子组件state,
            delCurrentId: ''
        }
    }

    componentDidMount() {
        // if (this.state.item.likes) {
        //     this.setState({ likes: this.state.item.likes.length })
        //     //在 icon表达式中判断，登录登出后会动态切换，不仅仅在didMoout中来确定状态,但是点击 like btn样式不会变
        //     // if (this.state.item.likes.includes(this.props.store.isLogin.userName)) {
        //     //     this.setState({ action: 'liked' })
        //     // }
        // }
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
        this.setState({ delCurrentId: id })
    }


    //确认删除 ==> 将id post 到 backend
    confirmDel = () => {
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
        }).catch(error => {
            console.log(error)
        })
    }
    cancelDel = () => {
        message.error('Cancel delete');
    }



    render() {
        let myStyle = {
            textAlign: 'center'
        }

        const { likes, dislikes, action } = this.state;
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
            // <span>
            //     <Tooltip title="Dislike">
            //         <Icon
            //             type="dislike"
            //             theme={action === 'disliked' ? 'filled' : 'outlined'}
            //             onClick={this.dislike}
            //         />
            //     </Tooltip>
            //     <span style={{ paddingLeft: 8, cursor: 'auto' }}>
            //         {dislikes}
            //     </span>
            // </span>,
            // <span>Reply to</span>,
        ];
        return (

            <div key={this.state.item.id}>
                <Comment key={this.state.item.id}
                    actions={actions}
                    author={this.state.item.user}
                    avatar={(<Avatar src={this.state.item.avatarUrl} alt={this.state.item.user} />)}
                    content={(
                        <div className="commentItem">
                            {/* 如果是myBlogs页面则显示 delBtn */}
                            {this.props.type === "myBlogs" ? <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirmDel} onCancel={this.cancelDel} okText="Yes" cancelText="No">
                                <div className="delBtn" onClick={this.handleDel.bind(this, this.state.item.id)}>&times;</div>
                            </Popconfirm> : null}
                            {/* title 链接 */}
                            <Link className="blogTitle" to={{ pathname: '/app/blogall/blogdetail', blogId: this.state.item.id, state: { id: this.state.item.id, user: this.state.item.user, avatar: this.state.item.avatarUrl, title: this.state.item.title, htmlDom: this.state.item.htmlDom, date: this.state.item.date, type: this.props.type } }}>{this.state.item.title}</Link>
                            {/* blog内容 */}
                            <div className="blogText">{this.state.item.text}</div>
                            {/* tags */}
                            <div style={{ marginTop: '5px' }}>
                                {this.state.item.tags.map(item => {
                                    return <div key={item} style={{ marginRight: '5px', display: 'inline' }}><BlogTag tag={item} /> </div>
                                })}
                            </div>


                        </div>)}
                    datetime={(
                        <Tooltip title={moment(this.state.item.date).format('LLLL')}>
                            <span>{moment(this.state.item.date).fromNow()}</span>
                        </Tooltip>
                    )}
                />

            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        store: state
    }
};

export default connect(mapStateToProps)(BlogItem)