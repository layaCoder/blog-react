import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import BlogAll from './BlogAll';
import Layout from './Layout';
import { connect } from 'react-redux'
import { initBlogs, getBlogsPageCount } from '../store/actions';
import axios from 'axios'
import APIS from '../api/index'

import { Progress } from 'antd';


class CRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        //初始化 store 中 blogs数组
        let url = APIS.blogList.devUrl
        console.log(url)
        axios.get(url).then(res => {
            console.log('blog list', res)
            this.props.dispatch(initBlogs(res.data))
            // this.props.dispatch(getBlogsPageCount(this.props.store.blogs))//获取分页总页数
            
        })
        

    }
    render() {
        return (

            <div style={{ height: '100%' }}>
                <div>
                    {/* <Progress percent={this.state.percent} /> */}
                </div>
                <Router>
                    <Route render={({ location }) => {
                        return (
                            <Switch>
                                <Route path='/app' component={Layout} />
                                {/* <Route path='/' component={Layout}  /> */}
                                < Route exact path="/" render={() => <Redirect to={{ pathname: "/app/blogall" }} />} />
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