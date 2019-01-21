import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import BlogAll from './BlogAll';
import Layout from './Layout';
import { connect } from 'react-redux'
import { initBlogs } from '../store/actions';
import axios from 'axios'
import APIS from '../api/index'


class CRouter extends Component {

    componentDidMount() {
        //初始化 store 中 blogs数组
        let url = APIS.blogList.devUrl
        console.log(url)
        axios.get(url).then(res => {
            console.log('blog list', res)
            this.props.dispatch(initBlogs(res.data))
        })
    }
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

let mapStateToProps = (state) => {
    return {
        store: state
    }
};

export default connect(mapStateToProps)(CRouter);