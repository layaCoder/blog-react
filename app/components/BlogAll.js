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
            pageSize: 10, //现阶段pageSize不能更改，因为关联到store中的 blogsPageCount，后续讨论如何更新
            pageNum: 1
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

    render() {
        let myStyle = {
            textAlign: 'center'
        }
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
                                    return <Comment key={item.id}
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
                            <Pagination defaultCurrent={1}
                                current={this.state.pageNum}
                                pageSize={this.state.pageSize}
                                total={this.props.store.blogs.length}
                                onChange={this.changeNum}
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



