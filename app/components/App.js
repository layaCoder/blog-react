import React, { Component } from 'react'
import imgUrl from '../assets/img/32.png'
import { BrowserRouter as Router, Route, Swich, Link } from 'react-router-dom';
import Page2 from './page2'
import Page1 from './page1'
require('../styles/index.css')

export default class App extends Component {
    render() {
        let myStyle = {
            textAlign: 'center'
        }
        return (
            <div style={myStyle}>
                <div>hi hi laya</div>
                <img src={imgUrl} className="img"></img>
                <div>
                    <li><Link to="/">Page1</Link></li>
                    <li><Link to="/page2">Page2</Link></li>
                </div>
            </div>

        )
    }
}