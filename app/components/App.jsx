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
    }
    render() {
        return (

            <div style={{ height: '100%' }} >
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