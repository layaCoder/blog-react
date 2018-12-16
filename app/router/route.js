import React from 'react';
import { BrowserRouter as Router, Route, Swich, Link } from 'react-router-dom';


import Page1 from '../components/page1';
import Page2 from '../components/page2';
import App from '../components/App';

const getRouter = () => (
    <Router >
        <div>
            <App />
            <Route path="/page2" component={Page2} />
            <Route exact path="/" component={Page1} />
        </div>


    </Router>
);

export default getRouter;