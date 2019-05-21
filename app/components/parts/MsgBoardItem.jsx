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
                  {this.props.msgItem._id}
                </div> : null}
            </div>
        )


    }

}

export default MsgBoardItem