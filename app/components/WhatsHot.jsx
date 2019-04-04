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
                            <span>沐沐酱真是越来越调皮了</span>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <i className='hots-tag'>#</i>
                            <span>现阶段的迷茫</span>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <i className='hots-tag'>#</i>
                            <span>前段项目打包优化</span>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <i className='hots-tag'>#</i>
                            <span>关于网站样式</span>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <i className='hots-tag'>#</i>
                            <span>AsideMenu侧滑导航</span>
                        </a>
                    </li>

                </ul>
            </div>
        )
    }
}