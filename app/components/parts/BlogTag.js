import React, { Component } from 'react'
import { Tag } from 'antd';



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

    handleClick = () => {
        alert(this.state.tagStr)
    }

    render() {
       
        return (
            <div style={{ display: 'inline' }}>
                <Tag color={this.state.color} onClick={this.handleClick}>{this.state.tagStr}</Tag>
            </div>
        )
    }
}