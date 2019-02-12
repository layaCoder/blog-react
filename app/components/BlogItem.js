import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Comment, Icon, Tooltip, Avatar, Modal, Button, DatePicker, Row, Col, Skeleton, Pagination } from 'antd';

import { Route, Link, Switch } from 'react-router-dom';
import moment from 'moment';

export default class BlogItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            dislikes: 0,
            action: null,
            item: props.item //将父组件props传给子组件state
        }
    }

    componentDidMount() {
    }


    like = () => {
        alert(this.state.item.id)
    }

    dislike = (blogId) => {
        alert(this.state.item.id)
    }

    render() {
        let myStyle = {
            textAlign: 'center'
        }

        const { likes, dislikes, action } = this.state;
        const actions = [

        ];
        return (

            <div key={this.state.item.id}>
                <Comment key={this.state.item.id}
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
                {/* ---点赞控件 ---*/}
                <div style={{ paddingLeft: '45px', marginTop: '-10px' }}>
                    <span>
                        <Tooltip title="Like">
                            <Icon
                                type="like"
                                theme={action === 'liked' ? 'filled' : 'outlined'}
                                onClick={this.like}
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
                                onClick={this.dislike}
                            />
                        </Tooltip>
                        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                            {dislikes}
                        </span>
                    </span>
                </div>
                {/* ----------- */}
            </div>
        )
    }
}