import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Comment, Icon, Tooltip, Avatar,
} from 'antd';
import moment from 'moment';
import { DatePicker, Row, Col } from 'antd'

import 'antd/dist/antd.css';
import { setLocalStorage, getLocalStorage } from '../utils/commUtils'

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
                            author={item.name}
                            avatar={(<Avatar src={item.avatarUrl} alt={item.name} />)}
                            content={(<div key={item.id} dangerouslySetInnerHTML={{ __html: item.text }}></div>)}
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



