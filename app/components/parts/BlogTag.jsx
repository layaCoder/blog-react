import React, { Component } from 'react'
import { Tag } from 'antd';
import {  Link } from 'react-router-dom';




export default class BlogTag extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tagStr: this.props.tag,
            color: null
        }
    }

    componentDidMount() {
        switch (this.state.tagStr) {

            case 'Frontend':
                this.setState({ color: 'red' })
                return
            case 'Backend':
                this.setState({ color: 'orange' })
                return
            case 'IOS':
                this.setState({ color: 'gold' })
                return
            case 'Android':
                this.setState({ color: 'green' })
                return
            case 'Design':
                this.setState({ color: 'cyan' })
                return
            case 'DevTool':
                this.setState({ color: 'geekblue' })
                return
            case 'LifeStyle':
                this.setState({ color: 'purple' })
            default: return null
        }
    }

    render() {

        return (
            <div style={{ display: 'inline' }}>
                <Link to={{ pathname: '/app/blogall/blogfilter', tag: this.state.tagStr }} replace><Tag color={this.state.color}>{this.state.tagStr}</Tag></Link>
            </div >
        )
    }
}