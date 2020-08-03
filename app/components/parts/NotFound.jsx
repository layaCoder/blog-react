import React, { Component } from 'react'
import html from '../../assets/404/404'

export default class NotFound extends Component {
    componentDidMount() {
    }

    render() {
        const notFoundPage = html
        return (
            <div>
             <div dangerouslySetInnerHTML={{ __html: notFoundPage }}></div>             
            </div>
        )
    }
}