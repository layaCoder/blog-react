import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Comment, Icon, Tooltip, Avatar, Modal, Button, DatePicker, Row, Col, Skeleton, Pagination } from 'antd';
import { withRouter } from 'react-router-dom';
import { Route, Link, Switch } from 'react-router-dom';
import moment from 'moment';

import 'antd/dist/antd.css';
import { setLocalStorage, getLocalStorage } from '../utils/commUtils'
import { initBlogs } from '../store/actions';
require('../assets/styles/BlogAll.css')

class BlogAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            blogObj: '',
            blogs: [],
            pageSize: 10,
            pageNum: 1,
            ///////////
            likes: 0,
            dislikes: 0,
            action: null
            ////////
        }
    }

    componentDidMount() {
        console.log('did mount', this.props)
    }

    componentDidUpdate() {
        // console.log('Updated', this.props.store)
        // //先判断当前 isLoading 状态，避免进入死循环
        // if (this.state.isLoading !== false) {
        //     this.setState({ isLoading: false })
        // }
    }

    showBlogDetail = (item) => {
        //【对话框显示 blogDetail】
        console.log('blogObj', item)
        this.setState({
            blogObj: item
        })
        this.setState({
            visible: true
        })
        //【跳转页面显示blogDetail】

        const thisComp = this//将Layout组件通过thisComp变量绑定，在confirm中使用
        thisComp.props.history.push('/app/blogdetail')
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    changeNum = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ pageNum: page })
    }

    changePageSize = (current, size) => {
        //设置pageSize后返回第一页（pageNum:1)，避免选择Size后当前页显示错误
        this.setState({ pageSize: size, pageNum: 1 })
    }


    like = (blogId) => {
        alert(blogId)
    }

    dislike = (blogId) => {
        alert(blogId)
    }

    render() {
        let myStyle = {
            textAlign: 'center'
        }

        let paginationStyle = {
            textAlign: 'center',
            marginTop: '20px'
        }

        const { likes, dislikes, action } = this.state;
        const actions = [

        ];


        return (
            <div>
                <div>
                    {this.props.store.blogs.length === 0 ?
                        < Skeleton avatar paragraph={{ rows: 4 }} />
                        : null}
                </div>
                {this.props.store.blogs.length > 0 ?
                    <div>
                        <Row>
                            <h2 style={myStyle}>All Blogs</h2>
                        </Row>
                        <Row>
                            {
                                // this.props.store.blogs.map(item => {
                                this.props.store.blogs.slice((this.state.pageNum - 1) * this.state.pageSize, (this.state.pageNum - 1) * this.state.pageSize + this.state.pageSize).map(item => {
                                    return <div key={item.id}>
                                        <Comment key={item.id}
                                            author={item.user}
                                            avatar={(<Avatar src={item.avatarUrl} alt={item.user} />)}
                                            content={(
                                                <div>
                                                    {/* 【用于对话框形式显示blogDetail】 
                                    <div><a onClick={this.showBlogDetail.bind(this, item)}>{item.title}</a></div> */}
                                                    <Link to={{ pathname: '/app/blogall/blogdetail', blogId: item.id, state: { id: item.id, user: item.user, avatar: item.avatarUrl, title: item.title, htmlDom: item.htmlDom, date: item.date } }}>{item.title}</Link>
                                                    <div className="blogText">{item.text}</div>
                                                </div>)}
                                            datetime={(
                                                <Tooltip title={moment(item.date).format('LLLL')}>
                                                    <span>{moment(item.date).fromNow()}</span>
                                                </Tooltip>
                                            )}
                                        />
                                        {/* ---点赞控件 ---*/}
                                        <div style={{ paddingLeft: '45px', marginTop: '-10px' }}>
                                            <span>
                                                <Tooltip title="Like">
                                                    <Icon
                                                        type="like"
                                                        theme={action === 'liked' ? 'filled' : 'outlined'}
                                                        onClick={this.like.bind(this, item.id)}
                                                    />
                                                </Tooltip>
                                                <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                                                    {likes}
                                                </span>
                                            </span>
                                            <span style={{ paddingLeft: '20px' }}>
                                                <Tooltip title="Dislike">
                                                    <Icon
                                                        type="dislike"
                                                        theme={action === 'disliked' ? 'filled' : 'outlined'}
                                                        onClick={this.dislike.bind(this, item.id)}
                                                    />
                                                </Tooltip>
                                                <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                                                    {dislikes}
                                                </span>
                                            </span>
                                        </div>
                                        {/* ----------- */}
                                    </div>

                                })}
                            {/* {this.state.blogs.map(item => {
                        return <Comment key={item.id}
                            author={item.user}
                            avatar={(<Avatar src={item.avatarUrl} alt={item.user} />)}
                            content={(
                                <div>
                                    
                                    <Link to={{ pathname: '/app/blogall/blogdetail', blogId: item.id, state: { id: item.id, user: item.user, avatar: item.avatarUrl, title: item.title, htmlDom: item.htmlDom } }}>{item.title}</Link>
                                    <div className="blogText">{item.text}</div>
                                </div>)}
                            datetime={(
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment().fromNow()}</span>
                                </Tooltip>
                            )}
                        />
                    })} */}
                        </Row>
                        <Row>
                            <Pagination style={paginationStyle}
                                defaultCurrent={1}
                                current={this.state.pageNum}
                                pageSize={this.state.pageSize}
                                total={this.props.store.blogs.length}
                                onChange={this.changeNum}
                                onShowSizeChange={this.changePageSize}
                                pageSizeOptions={["5", "10", "15", "20"]}
                                showSizeChanger
                                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                            />
                        </Row>
                        {/* 模态框中显示具体blog内容 */}
                        {/* <Modal
                            title={this.state.blogObj.title}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            footer={null}
                        >
                            <div dangerouslySetInnerHTML={{ __html: this.state.blogObj.htmlDom }}></div>
                        </Modal> */}
                    </div>
                    : null}

            </div>

        )
    }
}

let mapStateToProps = (state) => {
    console.log('store=>>>>', state)
    return {
        store: state
    }
};

export default withRouter(connect(mapStateToProps)(BlogAll));

        // export default connect(mapStateToProps)(BlogAll)



