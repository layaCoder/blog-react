import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Comment, Icon, Tooltip, Avatar, Modal, Button, DatePicker, Row, Col, Skeleton, Pagination } from 'antd';

import { Route, Link, Switch } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux'

import axios from 'axios';
import APIS from '../api/index';

require('../assets/styles/BlogItem.css')

class BlogItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            // dislikes: 0,
            action: '',
            item: props.item //将父组件props传给子组件state
        }
    }

    componentDidMount() {
        console.log('blog item ==>', this.state.item)
        if (this.state.item.likes) {
            this.setState({ likes: this.state.item.likes.length })
            //在 icon表达式中判断，登录登出后会动态切换，不仅仅在didMoout中来确定状态,但是点击 like btn样式不会变
            // if (this.state.item.likes.includes(this.props.store.isLogin.userName)) {
            //     this.setState({ action: 'liked' })
            // }
        }
    }



    like = () => {
        if (this.props.store.isLogin.login === true) {
            //如果已经点赞
            if ((this.state.item.likes.includes(this.props.store.isLogin.userName) === true || this.state.action === 'liked' === true)) {
                alert('you have liked this blog')
                return
            }
            //如果没有点赞
            else {
                this.setState({ action: 'liked', likes: this.state.likes + 1 })
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
            alert('pleaz login first')
        }
    }

    // dislike = () => {
    //     alert(this.state.item.id)
    // }

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
                    {likes}
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
                        <div>
                            {/* 【用于对话框形式显示blogDetail】 
                                    <div><a onClick={this.showBlogDetail.bind(this, item)}>{item.title}</a></div> */}
                            <Link to={{ pathname: '/app/blogall/blogdetail', blogId: this.state.item.id, state: { id: this.state.item.id, user: this.state.item.user, avatar: this.state.item.avatarUrl, title: this.state.item.title, htmlDom: this.state.item.htmlDom, date: this.state.item.date } }}>{this.state.item.title}</Link>
                            <div className="blogText">{this.state.item.text}</div>
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