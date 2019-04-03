import React, { Component } from 'react'
require('../assets/styles/WhatsHot.scss')

export default class WhatsHot extends Component {
    componentDidMount() {
    }

    render() {

        return (
            <div className='whats-hot-wrapper'>
                <h2 className='hots-title'>what's hot</h2>
                <ul>
                    <li>
                        <a href='#'>
                            <i className='hots-tag'>#</i>
                            some article
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <i className='hots-tag'>#</i>
                            some article
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <i className='hots-tag'>#</i>
                            some article
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <i className='hots-tag'>#</i>
                            some article
                        </a>
                    </li>

                </ul>
            </div>
        )
    }
}