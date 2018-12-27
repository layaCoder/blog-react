import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom';
import MyBlog from './MyBlog';
import WriteBlog from './WriteBlog';
import BlogAll from './BlogAll';
import { Layout, Menu, Breadcrumb, Button, Dropdown, Icon, Row, Col, Modal } from 'antd';
import Login from './parts/LoginComponent'
import { withRouter } from 'react-router-dom';

import { setLocalStorage, getLocalStorage } from '../utils/commUtils'
require('../assets/styles/Layout.css')


class Page3 extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            isLogin: false
        }
    }

    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    }

    handleLogOut = () => {
        //将Layout组件通过thisComp变量绑定，在confirm中使用
        const thisComp = this
        Modal.confirm({
            title: 'Log out!!!',
            content: 'Do you want to log out?',
            onOk() {
                //在onOk函数中无法使用this.setState,使用之间绑定的thisComp变量来调用setState方法
                thisComp.setState({ isLogin: false })
                localStorage.removeItem('user')
                thisComp.props.history.push('/app/blogall')
            },
            onCancel() { },
        });
    }

    //loginComp调用，子组件模态框中确认登录后改变父组件state
    showLoginRoot = () => {
        this.setState({ isLogin: true })
    }

    componentDidMount() {
        // * 登录持续时间
        if (getLocalStorage('user', 1000 * 60 * 60 * 24) !== null) {
            console.log(getLocalStorage('user', 1000 * 60 * 60 * 24))
            this.setState({ isLogin: true })
        }
        else {
            this.setState({ isLogin: false })
        }
    }

    componentDidlUpdate() {

    }

    render() {
        const { Header, Content, Footer } = Layout;
        const confirm = Modal.confirm;

        return (

            <Layout className="layout">

                <Header>
                    <Row>
                        <Col span={18}>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1">
                                    <Link to='/app/blogall' >All Blog</Link>
                                </Menu.Item>
                                <Menu.Item key="2" style={{ display: this.state.isLogin == true ? '' : 'none' }}>
                                    <Link to={'/app/myblog'}  >My Blog</Link>
                                </Menu.Item>
                                <Menu.Item key="3" style={{ display: this.state.isLogin == true ? '' : 'none' }}>
                                    <Link to={'/app/writeblog'}>Write Blog</Link>
                                </Menu.Item>
                            </Menu>
                        </Col>
                        <Col span={3} style={{ display: this.state.isLogin == true ? 'none' : '' }}>
                            <Button type="primary" onClick={this.showModal}>Login</Button>
                        </Col>
                        <Col span={2} style={{ display: this.state.isLogin == true ? '' : 'none' }}>
                            <span className="head-userName" > Hello: {this.state.isLogin === true ? JSON.parse(getLocalStorage('user', 1000 * 60 * 60 * 24)).name : ''}</span>
                        </Col>
                        <Col span={3} style={{ display: this.state.isLogin == true ? '' : 'none' }}>
                            <Button type="primary" onClick={this.handleLogOut}>Log out</Button>
                        </Col>
                    </Row>
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
                    ©2018 Created by laya Studio
    </Footer>
                {/* 模态框 */}
                <div>
                    <Modal
                        title="User login"
                        visible={this.state.modalVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        // footer = null 取消模态框的【确认】【取消】button
                        footer={null}
                    >
                        <Login handleCancel={this.handleCancel} showLoginRoot={this.showLoginRoot} />
                    </Modal>
                </div>
            </Layout>
        )
    }
}

export default withRouter(Page3);