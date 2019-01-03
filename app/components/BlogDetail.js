import React, { Component } from 'react'

export default class BlogDetail extends Component {
    constructor() {
        super();
        this.state = {
            blogId: '',
            // blogItem: {
            //     title: '1',
            //     htmlDom: '2',
            //     user: '4',
            //     id: 5
            // },
            id: '',
            title: '',
            htmlDom: '',
            user: '',


        }
    }

    componentDidMount() {

        // this.setState({
        //     blogItem: this.props.location.state
        // })
        console.log(this.props.location.state)
        if (!this.props.location.state !== undefined) {
            this.setState({
                id: this.props.location.state.id,
                title: this.props.location.state.title,
                htmlDom: this.props.location.state.htmlDom,
                user: this.props.location.state.user
            })

        }


    }


    render() {
        let myStyle = {
            textAlign: 'center'
        }
        return (
            <div>
                <h2>{this.state.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: this.state.htmlDom }}></div>
                <p>author : {this.state.user}</p>
                <p>state:blogId</p>
                <p>{this.state.id}</p>
            </div>

        )
    }
}