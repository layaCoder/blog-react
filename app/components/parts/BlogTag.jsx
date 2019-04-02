import React, { Component } from 'react'
import { Tag } from 'antd';
import { withRouter, Link } from 'react-router-dom';




class BlogTag extends Component {
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
            case 'CentOS':
                this.setState({ color: 'gold' })
                return
            case 'JavaScript':
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
    handleLink = () => {
        this.props.history.push({
            pathname: '/app/blogall/blogfilter/' + this.state.tagStr,
        }
        )
    }


    render() {

        return (
            <div style={{ display: 'inline' }}>
                {/* <Link to={{ pathname: '/app/blogall/blogfilter', tag: this.state.tagStr }} replace><Tag color={this.state.color}>{this.state.tagStr}</Tag></Link> */}
                <a onClick={this.handleLink} ><Tag color={this.state.color}>{this.state.tagStr}</Tag></a>

            </div >
        )


    }

}

export default withRouter(BlogTag)
