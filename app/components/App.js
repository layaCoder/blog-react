import React, { Component } from 'react'
import imgUrl from '../assets/img/32.png'
require('../styles/index.css')

export default class Page2 extends Component {
    render() {
        let myStyle = {
            textAlign: 'center'
        }
        return (
            <div style={myStyle}>
                <div>hi hi laya</div>
                <img src={imgUrl} className="img"></img>
            </div>
        )
    }
}