import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './Layout';
import MyBlog from './MyBlog';
import WriteBlog from './WriteBlog';
import BlogAll from './BlogAll';
import BlogDetail from './BlogDetail';

export default class CRouter extends Component {
    render() {
        return (
            <Router>
                <Layout exact path="/app" component={Layout}>
                    <Route exact path="/app/myblog" component={MyBlog} />
                    <Route exact path="/app/writeblog" component={WriteBlog} />
                    <Route exact path="/app/blogall" component={BlogAll}></Route>
                    <Route exact path="/app/blogall/blogdetail" component={BlogDetail}></Route>
                </Layout>
            </Router>
        )
    }
}