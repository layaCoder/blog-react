import React, { Component } from 'react'
import { Button, Row, Col, Icon, Divider, Comment, Tooltip, Avatar, Form, Input, message } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux'
import axios from 'axios';
import APIS from '../api/index';
import { saveReply } from '../store/actions'
import { get_uuid } from '../utils/commUtils'
require('../assets/styles/BlogDetail.scss')

const TextArea = Input.TextArea;

class BlogDetail extends Component {
    constructor() {
        super();
        this.state = {
            blogId: '',
            // blogItem: {
            //     title: '1',
            //     htmlDom: '2',
            //     user: '4',
            //     id: 5
            // },
            id: '',
            title: '',
            htmlDom: '',
            user: '',
            type: null, //记录入口类别， myBlog? allBlog? or others
            replyText: null,
            isLoading: false
        }
    }

    componentDidMount() {
        //通过入口返回，如果强制f5刷新页面，type=null ,返回 blogAll
        if (this.props.location.state) {
            this.setState({ type: this.props.location.state.type })
        }
    }

    goBack = () => {
        //this.props.history.goBack()
        if (this.state.type === 'myBlogs')
            this.props.history.push('/app/myblog') //js方式控制也秒跳转

        else {
            this.props.history.push('/app/blogall')
        }
    }

    onChangeReply = (e) => {
        this.setState({ replyText: e.target.value })
    }

    handleSubmit = () => {
        this.setState({ isLoading: true })
        let replyId = get_uuid() //生成回复数据id

        if (!this.state.replyText) {
            message.warning('comment can\'t not be null!!!')
            return
        }
        axios({
            method: 'post',
            url: APIS.saveBlogReply.devUrl,
            headers: {
                // 'Content-type': 'application/x-www-form-urlencoded'
                'Content-type': 'application/json'
            },
            data: {
                id: replyId,
                blogId: this.props.match.params.id,
                name: this.props.store.isLogin.userName,
                avatarUrl: this.props.store.isLogin.avatarUrl,
                replyText: this.state.replyText
            }
        }).then(res => {
            console.log(res)
            //添加到store中的BlogList
            this.props.dispatch(saveReply(replyId, this.props.match.params.id, this.state.replyText, this.props.store.isLogin.userName, this.props.store.isLogin.avatarUrl))
            this.setState({ replyText: '' });
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.setState({ isLoading: false })
        })
    }

    render() {
        let myStyle = {
            textAlign: 'center'
        }

        const blogDetailItem = this.props.store.blogs.filter(item => item.id === this.props.match.params.id)


        return (
            <div>
                {blogDetailItem.length > 0 ? //判断store中blogList是否加载完毕
                    <div>
                        <Row>
                            <Divider> <h2 style={myStyle}>{blogDetailItem[0].title}</h2></Divider>
                        </Row>
                        <Row>
                            <Col span={5} offset={8}><p>Author:&nbsp;{blogDetailItem[0].user}</p></Col>
                            <Col span={8}><p>Date:&nbsp;{moment(this.state.date).format('LLLL')}</p></Col>
                            <Divider dashed />
                        </Row>
                        <Row>
                            <Col span={20} offset={2}>
                                <div dangerouslySetInnerHTML={{ __html: blogDetailItem[0].htmlDom }}></div>
                            </Col>
                        </Row>
                        {/* 写评论 */}
                        <Divider dashed />
                        <Row className="replyArea">
                            <h3 style={myStyle}>Comments</h3>
                        </Row>
                        <Row>
                            <Col span={20} offset={2}>
                                <Form.Item >
                                    <TextArea rows={4} onChange={this.onChangeReply} value={this.state.replyText} placeholder="plz write some comments" />
                                </Form.Item>
                                <Button className='btnSubmit' onClick={this.handleSubmit} loading={this.state.isLoading}>Submit</Button>
                            </Col>
                        </Row>
                        {/* 评论显示区 */}
                        <Row>
                            <Col span={20} offset={2}>
                                {blogDetailItem[0].replys.length > 0 ?
                                    blogDetailItem[0].replys.map(item => {
                                        return <Comment
                                            key={item.id}
                                            author={item.user}
                                            avatar={(
                                                <Avatar
                                                    src={item.avatarUrl}
                                                    alt={item.user}
                                                />
                                            )}
                                            content={
                                                (<div> {item.replyText}</div>)
                                            }
                                            datetime={(
                                                <Tooltip title={moment(item.date).format('LLLL')}>
                                                    <span>{moment(item.date).fromNow()}</span>
                                                </Tooltip>
                                            )}
                                        />
                                    })
                                    : null
                                }
                            </Col>
                        </Row>
                    </div>
                    : null}
                <Row className="footer" style={{ marginTop: '50px' }}>
                    <Divider />
                    <Button type="dashed" onClick={this.goBack}><Icon type="left" /> Go back</Button>
                </Row>
            </div>

        )
    }
}

let mapStateToProps = (state) => {
    return {
        store: state
    }
};

export default connect(mapStateToProps)(BlogDetail);