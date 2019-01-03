import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import App2 from "./components/App2"
import Layout from "./components/Layout"
import { HashRouter as Router, Route, Switch, Redirect, withRouter, Link } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import blogApp from './store/reducers.js'

const store = createStore(blogApp, applyMiddleware(thunk));

console.log('store', store.getState())

ReactDom.render(
    <Provider store={store}>
        {/* <Router><App /></Router></Provider>, */}
        <App /></Provider>,
    document.getElementById("root")
);
