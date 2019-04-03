import React, { Component } from 'react'
require('../assets/styles/Home.scss')

export default class Home extends Component {
    componentDidMount() {
    }

    render() {
        let myStyle = {
            textAlign: 'homecenter'
        }
        return (
            <div>
                {/* <h2>welcome home!!!!</h2> */}
                <div id="wrap">
                    <div id="red"></div>
                    <div id="yellow"></div>
                    <div id="pink"></div>
                    <div id="cyna"></div>
                </div>
                <div id="limb"></div>
            </div>
        )
    }
}