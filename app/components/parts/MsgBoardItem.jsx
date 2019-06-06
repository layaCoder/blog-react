import React, { Component } from 'react'
import { Tag, Row, Col, Avatar, Tooltip } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment'
import Item from 'antd/lib/list/Item';
import * as untils from '../../utils/commUtils';
require('../../assets/styles/MessageBoard.scss')




class MsgBoardItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    componentDidMount() {
        console.log('child props', this.props)
    }




    render() {

        return (
            <div>
                {/* <div>
                    {this.props.msgItem ?
                        <div>
                            <strong>------------------------</strong>
                            <div>
                                {this.props.msgItem._id}
                            </div>
                            <div>
                                {this.props.msgItem.author}
                            </div>
                            <div>
                                {this.props.msgItem.avatarUrl}
                            </div>
                            <div>
                                {this.props.msgItem.content}
                            </div>
                            <div>
                                {this.props.msgItem.date}
                            </div>
                        </div> : null}
                </div> */}
                <Row>
                    {this.props.msgItem ?
                        <Row className='msgBoardItem-row'>
                            <Row>
                                <div className='msgBoardItem-col'>
                                    <Avatar icon="user"></Avatar>
                                </div>
                                <div className='msgBoardItem-col'>
                                    {this.props.msgItem.author}
                                </div>
                                <div className='msgBoardItem-col'>
                                    <Tooltip title={moment(this.props.msgItem.date).format('LLLL')} className='dateTip'>
                                        <span>{moment(this.props.msgItem.date).fromNow()}</span>
                                    </Tooltip>
                                </div>
                            </Row>
                            <Row>
                                <div className='msgBoardItem-content'>
                                    {untils.delHtmlTag(this.props.msgItem.content) }
                                </div>
                            </Row>
                            <Row>
                                {this.props.msgItem.replys.map(item => {
                                    return <div>{item}</div>
                                })
                                }
                            </Row>
                        </Row>
                        : null}
                </Row>
            </div>

        )


    }

}

export default MsgBoardItem