import React, { Component } from 'react'
import { Route, Link, Switch, withRouter, Redirect } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button, Dropdown, Icon, Row, Col, Modal } from 'antd';



import MyBlog from './MyBlog';
import WriteBlog from './WriteBlog';
import BlogAll from './BlogAll';
import Login from './parts/LoginComponent'
import BlogDetail from './BlogDetail'
import Home from './Home'
import UploadAvatarComponent from './parts/UploadAvatarComponent'
import ChangePass from './parts/ChangePassComponent'

import BreadcrumbCusstom from './parts/BreadcrumbCustom '

import { setLocalStorage, getLocalStorage } from '../utils/commUtils'
require('../assets/styles/Layout.css')


class Page3 extends Component {
    constructor() {
        super();
        this.state = {
            uploadAvatarVisible: false,
            modalVisible: false,
            isLogin: false,
            changePassVisible: false
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

    handleCloseUploadAvatar = (e) => {
        this.setState({
            uploadAvatarVisible: false
        })
    }

    handleLogOut = () => {
        //将Layout组件通过thisComp变量绑定，在confirm中使用
        const thisComp = this
        Modal.confirm({
            title: 'Logout!!!',
            content: 'Do you want to logout?',
            onOk() {
                //在onOk函数中无法使用this.setState,使用之间绑定的thisComp变量来调用setState方法
                thisComp.setState({ isLogin: false })
                localStorage.removeItem('user')
                thisComp.props.history.push('/app/blogall')
            },
            onCancel() { },
        });
    }
    handleChangePassClose = () => {
        this.setState({ changePassVisible: false })
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

        const dropdownClick = ({ key }) => {
            console.log(typeof key)
            switch (key) {
                case '1':
                    this.setState({ uploadAvatarVisible: true })

                    break;
                case '2':
                    this.setState({ changePassVisible: true })
                    break;
                case '3':
                    this.handleLogOut()
                    break;
                default:
                    return
            }
        };

        const menu = (
            <Menu onClick={dropdownClick}>
                <Menu.Item key="1">Upload avatar</Menu.Item>
                <Menu.Item key="2">Change password</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">Logout</Menu.Item>
            </Menu>
        );

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
                                <Menu.Item key="4" style={{ display: 'none' }}>
                                    <Link to={'/app/blogall/blogdetail'}>Blog Detail</Link>
                                </Menu.Item>
                            </Menu>
                        </Col>
                        <Col span={3} style={{ display: this.state.isLogin == true ? 'none' : '' }}>
                            <Button type="primary" onClick={this.showModal}>Login</Button>
                        </Col>
                        {/* <Col span={2} style={{ display: this.state.isLogin == true ? '' : 'none' }}>
                            <span className="head-userName" > Hello: {this.state.isLogin === true ? JSON.parse(getLocalStorage('user', 1000 * 60 * 60 * 24)).name : ''}</span>
                        </Col> */}
                        <Col span={3} style={{ display: this.state.isLogin == true ? '' : 'none' }}>
                            {/* <Button type="primary" onClick={this.handleLogOut}>Log out</Button> */}
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" href="#">
                                    <span className="head-userName" > Hello: {this.state.isLogin === true ? JSON.parse(getLocalStorage('user', 1000 * 60 * 60 * 24)).name : ''}</span>
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>

                <Content style={{ padding: '0 50px' }}>
                    <BreadcrumbCusstom />
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        {/* 用switch方式来显示路由组件 */}
                        <Switch>
                            <Route exact path='/app' component={Home} />
                            <Route exact path="/app/myblog" component={MyBlog} />
                            <Route exact path="/app/writeblog" component={WriteBlog} />
                            <Route exact path="/app/blogall" component={BlogAll}></Route>
                            <Route exact patch="/app/blogall/blogdetail" component={BlogDetail}></Route>
                        </Switch>

                        {/* 用this.props.children方式来显示路由组件 */}
                        {/* <div style={{ marginTop: '1.5em' }}>{this.props.children}</div> */}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>

                    ©2018 Created by laya Studio
    </Footer>
                {/* 模态框 */}
                <div>
                    {/* 用户登录模态框 */}
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
                <div>
                    {/* 上传头像模态框 */}
                    <Modal
                        title="Upload Avatar"
                        visible={this.state.uploadAvatarVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCloseUploadAvatar}
                        footer={null}
                        closable={false}
                    >
                        <UploadAvatarComponent handleClose={this.handleCloseUploadAvatar} />
                    </Modal>
                </div>
                <div>
                    {/* 修改密码模态框 */}
                    <Modal
                        title="Change Password"
                        visible={this.state.changePassVisible}
                        onOk={this.handleOk}
                        // footer={null}
                        closable={false}
                        onCancel={this.handleChangePassClose}
                    >
                        <ChangePass />
                    </Modal>
                </div>

            </Layout>
        )
    }
}

export default withRouter(Page3);