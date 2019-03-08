import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import blogApp from './store/reducers.js'

const store = createStore(blogApp, applyMiddleware(thunk));


ReactDom.render(
    <Provider store={store}>
        {/* <Router><App /></Router></Provider>, */}
        <App /></Provider>,
    document.getElementById("root")
);
