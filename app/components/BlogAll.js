import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Comment, Icon, Tooltip, Avatar,
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

        }
    }
    componentDidMount() {

    }
    componentDidUpdate() {
        console.log('Updated', this.props.store)
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
                                    <div>{item.title}</div>
                                    <div>{item.text}</div>
                                    <div className="blogText" key={item.id} dangerouslySetInnerHTML={{ __html: item.htmlDom }} onClick={this.handleClick}>
                                    </div>
                                </div>)}
                            datetime={(
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment().fromNow()}</span>
                                </Tooltip>
                            )}
                        />
                    })}
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

export default connect(mapStateToProps)(BlogAll)



