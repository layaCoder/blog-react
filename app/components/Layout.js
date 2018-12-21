import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom';
import MyBlog from './MyBlog';
import WriteBlog from './WriteBlog';
import BlogAll from './BlogAll';
import { Layout, Menu, Breadcrumb } from 'antd';

export default class page3 extends Component {

    render() {
        const { Header, Content, Footer } = Layout;
        return (
           
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
                            <Link to='/app/blogall' >All Blog</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={'/app/myblog'}  >My Blog</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={'/app/writeblog'}>Write Blog</Link>
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
                            <Route exact path="/app/myblog" component={MyBlog} />
                            <Route exact path="/app/writeblog" component={WriteBlog} />
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