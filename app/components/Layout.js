import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom';
import Page2 from './page2';
import Page3 from './page3';
import BlogAll from './BlogAll';
import { Layout, Menu, Breadcrumb } from 'antd';

export default class page3 extends Component {

    render() {
        const { Header, Content, Footer } = Layout;
        return (
            // <div>
            //     <div className='header'>
            //         <ul>
            //             <li><Link to={'/app/second'}>page2</Link></li>
            //             <li><Link to={'/app/third'}>page3</Link></li>
            //         </ul>
            //     </div>
            //     <Switch>
            //         <Route path="/app/second" component={Page2} />
            //         <Route path="/app/third" component={Page3} />
            //     </Switch>
            // </div>
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">
                            <Link to='/app/blogall' >blogAll</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={'/app/second'}  >page2</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={'/app/third'}>page3</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Switch>
                            <Route exact path="/app/second" component={Page2} />
                            <Route exact path="/app/third" component={Page3} />
                            <Route exact path="/app/blogall" component={BlogAll}></Route>
                        </Switch></div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
    </Footer>
            </Layout>
        )
    }
}