import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import BlogAll from './BlogAll';
import Layout from './Layout';
import { connect } from 'react-redux'


class CRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProgressPercent: 0,
        }
    }

    componentDidMount() {
        // 因进度条显示问题，将初始化 blogList数据 的动作 移到 layout组件中去执行
        // this.setState({ ProgressPercent: 75 })
        // //初始化 store 中 blogs数组
        // let url = APIS.blogList.devUrl
        // console.log(url)
        // axios.get(url).then(res => {
        //     console.log('blog list', res)
        //     this.setState({ ProgressPercent: 90 })
        //     this.props.dispatch(initBlogs(res.data))
        //     // this.props.dispatch(getBlogsPageCount(this.props.store.blogs))//获取分页总页数
        //     this.setState({ ProgressPercent: 99 })
        // })
    }
    render() {
        return (

            <div style={{ height: '100%' }}>
                <div>
                    {/* {this.state.ProgressPercent === 100 ? null : <Progress percent={this.state.ProgressPercent} status="active" showInfo={false} type="line" strokeWidth={5} />} */}
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