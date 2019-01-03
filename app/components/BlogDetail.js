import React, { Component } from 'react'

export default class BlogDetail extends Component {
    constructor() {
        super();
        this.state = {
            blogId: ''
        }
    }

    // componentDidUpdate() {
    //     console.log('!!!!', this.props.location.blogId)
    //     this.setState({
    //         blogId: this.props.location.blogId
    //     })
    // }



    componentDidMount() {
        this.setState({
            blogId: this.props.location.blogId
        })

        console.log(this.props.location.state)
    }


    render() {
        let myStyle = {
            textAlign: 'center'
        }
        return (
            <div>
                <h2>{this.props.location.state.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: this.props.location.state.htmlDom }}></div>
                <p>author : {this.props.location.state.user}</p>
                <p>state:blogId</p>
                <p>{this.props.location.state.id}</p>
            </div>

        )
    }
}