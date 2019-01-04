import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Comment, Icon, Tooltip, Avatar, Modal, Button, DatePicker, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { Route, Link, Switch } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios'

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
            blogs:[]
        }
    }
    componentDidMount() {
       
    }
    componentDidUpdate() {
        console.log('Updated', this.props.store)
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

    render() {

        return (
            <div>
                <Row>
                    <h2>All Blog</h2>
                </Row>
                <Row>
                     {this.props.store.blogs.map(item => {
                        return <Comment key={item.id}
                            author={item.user}
                            avatar={(<Avatar src={item.avatarUrl} alt={item.user} />)}
                            content={(
                                <div>
                                    {/* 【用于对话框形式显示blogDetail】 
                                    <div><a onClick={this.showBlogDetail.bind(this, item)}>{item.title}</a></div> */}
                                    <Link to={{ pathname: '/app/blogall/blogdetail', blogId: item.id, state: { id: item.id, user: item.user, avatar: item.avatarUrl, title: item.title, htmlDom: item.htmlDom } }}>{item.title}</Link>
                                    <div className="blogText">{item.text}</div>
                                </div>)}
                            datetime={(
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment().fromNow()}</span>
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
                {/* 模态框中显示具体blog内容 */}
                <Modal
                    title={this.state.blogObj.title}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div dangerouslySetInnerHTML={{ __html: this.state.blogObj.htmlDom }}></div>
                </Modal>
            </div>

        )
    }
}

let mapStateToProps = (state) => {
    return {
        store: state
    }
};

export default withRouter(connect(mapStateToProps)(BlogAll));

// export default connect(mapStateToProps)(BlogAll)



