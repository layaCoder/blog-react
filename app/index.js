import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import blogApp from './store/reducers.js'


/* composeEnhancers 启用redux devtool调试工具 ,项目打包时需要关闭，否则手机端无法正常打开页面*/
/*const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const store = createStore(blogApp,
    composeEnhancers(applyMiddleware(thunk))
);*/

const store = createStore(blogApp,applyMiddleware(thunk));


ReactDom.render(
    <Provider store={store}>
        {/* <Router><App /></Router></Provider>, */}
        <App /></Provider>,
    document.getElementById("root")
);
