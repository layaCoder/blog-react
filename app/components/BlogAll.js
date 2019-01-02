import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Comment, Icon, Tooltip, Avatar, Modal, Button
} from 'antd';
import moment from 'moment';
import { DatePicker, Row, Col } from 'antd'

import 'antd/dist/antd.css';
import { setLocalStorage, getLocalStorage } from '../utils/commUtils'
require('../assets/styles/BlogAll.css')

class BlogAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            blogObj: ''
        }
    }
    componentDidMount() {

    }
    componentDidUpdate() {
        console.log('Updated', this.props.store)
    }

    showBlogDetail = (item) => {
        console.log('blogObj', item)
        this.setState({
            blogObj: item
        })
        this.setState({
            visible: true
        })
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
                                    <div><a onClick={this.showBlogDetail.bind(this, item)}>{item.title}</a></div>
                                    <div className="blogText">{item.text}</div>
                                    {/* <div className="blogText" key={item.id} dangerouslySetInnerHTML={{ __html: item.htmlDom }} >
                                    </div> */}
                                </div>)}
                            datetime={(
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment().fromNow()}</span>
                                </Tooltip>
                            )}
                        />
                    })}
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

export default connect(mapStateToProps)(BlogAll)



