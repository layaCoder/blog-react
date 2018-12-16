import React from "react";
import ReactDom from "react-dom";
// import App from "./components/App";
import Root from './router/route.js';

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import blogApp from './store/reducers.js'

const store = createStore(blogApp, applyMiddleware(thunk));

console.log('store', store.getState())

ReactDom.render(
    <Provider store={store}>
        <Root /></Provider>,
    document.getElementById("root")
);
