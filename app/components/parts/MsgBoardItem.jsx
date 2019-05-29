import React, { Component } from 'react'
import { Tag } from 'antd';
import { withRouter, Link } from 'react-router-dom';




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
                {this.props.msgItem ?
                    <div>
                        <strong>------------------------</strong>
                        <div>
                            {this.props.msgItem._id}
                        </div>
                        <div>
                             {this.props.msgItem.auth}
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
            </div>
        )


    }

}

export default MsgBoardItem