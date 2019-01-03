import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import BlogAll from './BlogAll';
import Layout from './Layout';
import Home from './Home';

export default class CRouter extends Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
                <Router>
                    <Route render={({ location }) => {
                        return (
                            <Switch>
                                <Route path='/app' component={Layout} />
                                {/* <Route path='/' component={Layout}  /> */}
                                < Route exact path="/" render={() => <Redirect to="/app/blogall" />} />
                                <Route path='/BlogAll' component={BlogAll} />
                            </Switch>
                        )
                    }} />

                </Router>
            </div>
        )
    }
}