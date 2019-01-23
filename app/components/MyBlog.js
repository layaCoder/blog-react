import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Comment, Icon, Tooltip, Avatar, Modal, Button, DatePicker, Row, Col, Skeleton } from 'antd';
import { withRouter } from 'react-router-dom';
import { Route, Link, Switch } from 'react-router-dom';
import moment from 'moment';
import * as storage from '../utils/commUtils'

class MyBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            blogObj: '',
            blogs: [],
            userName: ''
        }
    }

    componentDidMount() {
        //获取当前登录的用户，以 name 作为 blogList的 filter条件
        let user = JSON.parse(storage.getLocalStorage("user", 1000 * 60 * 60 * 24))
        this.setState({ userName: user.name })
    }

    render() {
        let myStyle = {
            textAlign: 'center'
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
                                    this.props.store.blogs.filter(item => item.user === this.state.userName).map(item => {
                                        return <Comment key={item.id}
                                            author={item.user}
                                            avatar={(<Avatar src={item.avatarUrl} alt={item.user} />)}
                                            content={(
                                                <div>
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