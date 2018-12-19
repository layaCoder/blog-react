import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom';
import Page2 from './page2';
import Page3 from './page3'

export default class page3 extends Component {
    render() {
        return (
            <div>
                <div className='header'>
                    <ul>
                        <li><Link to={'/app/second'}>page2</Link></li>
                        <li><Link to={'/app/third'}>page3</Link></li>
                    </ul>
                </div>
                <Switch>
                    <Route path="/app/second" component={Page2} />
                    <Route path="/app/third" component={Page3} />
                </Switch>
            </div>
        )
    }
}