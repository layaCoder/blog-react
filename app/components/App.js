import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReduxTest from './ReduxTest';
import Layout from './Layout'

export default class CRouter extends Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
                <Router>
                    <Switch>
                        <Route path='/' component={Layout} />
                        <Route exact path='/app' component={Layout} />
                        <Route path='/ReduxTest' component={ReduxTest} />
                    </Switch>
                </Router>
            </div>
        )
    }
}
