import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Comment, Icon, Tooltip, Avatar, Modal, Button, Row, Skeleton, Pagination, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { Route, Link, Switch } from 'react-router-dom';
import moment from 'moment';
import * as storage from '../utils/commUtils'
import axios from 'axios';
import APIS from '../api/index';
import { delBlog } from '../store/actions'
import BlogItem from './BlogItem'




require('../assets/styles/MyBlog.css')


class MyBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            blogObj: '',
            blogs: [],
            userName: '',
            pageSize: 10,
            pageNum: 1,
            delCurrentId: null
        }
    }

    componentDidMount() {
        //获取当前登录的用户，以 name 作为 blogList的 filter条件
        let user = JSON.parse(storage.getLocalStorage("user", 1000 * 60 * 60 * 24))
        this.setState({ userName: user.name })
    }

    changeNum = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ pageNum: page })
    }

    changePageSize = (current, size) => {
        //设置pageSize后返回第一页（pageNum:1)，避免选择Size后当前页显示错误
        this.setState({ pageSize: size, pageNum: 1 })
    }

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
        let paginationStyle = {
            textAlign: 'center',
            marginTop: '20px'
        }
        return (
            <div>
                <div>
                    <h2 style={myStyle}>My Blogs</h2>
                </div>
                <div>
                    <div>
                        {this.props.store.blogs.length === 0 ?
                            < Skeleton avatar paragraph={{ rows: 4 }} />
                            : null}
                    </div>
                    {this.props.store.blogs.length > 0 ?
                        <div>
                            <Row>
                                {
                                    //用username过滤store中的blogs
                                    this.props.store.blogs.filter(item => item.user === this.state.userName).slice((this.state.pageNum - 1) * this.state.pageSize, (this.state.pageNum - 1) * this.state.pageSize + this.state.pageSize).map(item => {
                                        return <BlogItem item={item} key={item.id} type={'myBlogs'} />
                                        // <div key={item.id}>
                                        //     {/* <div style={{ float: 'right', marginTop: '20px' }}>&times;</div> */}
                                        //     <Comment
                                        //         key={item.id}
                                        //         author={item.user}
                                        //         avatar={(<Avatar src={item.avatarUrl} alt={item.user} />)}
                                        //         content={(
                                        //             <div className="commentItem">
                                        //                 <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirmDel} onCancel={this.cancelDel} okText="Yes" cancelText="No">
                                        //                     <div className="delBtn" onClick={this.handleDel.bind(this, item.id)}>&times;</div>
                                        //                 </Popconfirm>
                                        //                 <Link to={{ pathname: '/app/blogall/blogdetail', blogId: item.id, state: { id: item.id, user: item.user, avatar: item.avatarUrl, title: item.title, htmlDom: item.htmlDom, date: item.date } }}>{item.title}</Link>
                                        //                 <div className="blogText">{item.text}</div>
                                        //             </div>)}
                                        //         datetime={(
                                        //             <Tooltip title={moment(item.date).format('LLLL')}>
                                        //                 <span>{moment(item.date).fromNow()}</span>
                                        //             </Tooltip>
                                        //         )}
                                        //     />
                                        // </div>

                                    })}

                            </Row>
                            <Row>
                                <Pagination style={paginationStyle}
                                    defaultCurrent={1}
                                    current={this.state.pageNum}
                                    pageSize={this.state.pageSize}
                                    total={this.props.store.blogs.filter(item => item.user === this.state.userName).length}
                                    onChange={this.changeNum}
                                    onShowSizeChange={this.changePageSize}
                                    pageSizeOptions={["5", "10", "15", "20"]}
                                    showSizeChanger
                                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                                />
                            </Row>
                        </div>
                        : null}
                </div>
            </div>

        )
    }
}

let mapStateToProps = (state) => {
    return {
        store: state
    }
};

export default connect(mapStateToProps)(MyBlog)