import React, { Component } from 'react'
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown, Row, Col, Modal, Progress, message, Skeleton } from 'antd';
import { connect } from 'react-redux'

import MyBlog from './MyBlog';
import WriteBlog from './WriteBlog';
import BlogAll from './BlogAll';
import Login from './parts/LoginComponent'
import BlogDetail from './BlogDetail'
import Home from './Home'
import UploadAvatarComponent from './parts/UploadAvatarComponent'
import ChangePass from './parts/ChangePassComponent'
import BreadcrumbCusstom from './parts/BreadcrumbCustom '
import BlogFilterByTags from './BlogFilterByTags'

import { setLocalStorage, getLocalStorage } from '../utils/commUtils'
import { userLogin, userLogout, hasMoreBlogItem } from '../store/actions';

import axios from 'axios'
import APIS from '../api/index'
import { initBlogs } from '../store/actions';

require('../assets/styles/Layout.css')


class LayoutComponent extends Component {
    constructor() {
        super();
        this.state = {
            uploadAvatarVisible: false,
            modalVisible: false,
            isLogin: false,
            changePassVisible: false,
            ProgressPercent: 0, //进度条百分比
        }
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
                //改变redux store中的isLogin属性
                thisComp.props.dispatch(userLogout(false))
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
        //通过 url 包含string来判断加载的数据
        if (this.props.location.pathname.includes('blogall')) {
            this.initBlogAllData()
        }
        else if (this.props.location.pathname.includes('myblog')) {
            this.intiMyBlogData()
        }
        //初始化 blogList 数据
        // this.setState({ ProgressPercent: 60 })
        // let url = APIS.blogList.devUrl + '?pageIndex=1&pageSize=10'
        // axios.get(url).then(res => {
        //     this.setState({ ProgressPercent: 99 })
        //     this.props.dispatch(initBlogs(res.data, true))
        //     if (this.props.store.blogs.length > 0) {
        //         setInterval(() => { this.setState({ ProgressPercent: 100 }) }, 1000)
        //     }
        //     else
        //         message.warning('server err!!!')
        // })

        // * 登录持续时间
        if (getLocalStorage('user', 1000 * 60 * 60 * 24) !== null) {
            this.setState({ isLogin: true })
            this.props.dispatch(userLogin(true, JSON.parse(getLocalStorage('user', 1000 * 60 * 60 * 24)).name, JSON.parse(getLocalStorage('user', 1000 * 60 * 60 * 24)).avatar))
        }
        else {
            this.setState({ isLogin: false })
            this.props.dispatch(userLogout(false))
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
        this.setState({
            modalVisible: false,
        });
    }



    handleChangePassClose = () => {
        this.setState({ changePassVisible: false })
    }

    handleCloseUploadAvatar = (e) => {
        this.setState({
            uploadAvatarVisible: false
        })
    }

    initBlogAllData = () => {
        this.props.dispatch(hasMoreBlogItem(true))
        this.setState({ ProgressPercent: 80 })

        //加载页面数据
        let url = APIS.blogList.devUrl + '?pageIndex=1&pageSize=10'

        axios.get(url).then(res => {
            this.setState({ ProgressPercent: 90 })

            this.props.dispatch(initBlogs(res.data, true))
            this.setState({ ProgressPercent: 100 })

            if (this.props.store.blogs.length > 0) {
                // setInterval(() => { this.setState({ ProgressPercent: 100 }) }, 1000)
                // todo:将进度条从layout的state转移到store中
            }
            else {
                message.warning('server err!!!')
            }
        }).catch(err => {
            console.log(err)
        })

    }

    //初始化 blogAll数据
    intiMyBlogData = () => {
        this.props.dispatch(hasMoreBlogItem(true))
        this.setState({ ProgressPercent: 80 })
        let user = JSON.parse(getLocalStorage("user", 1000 * 60 * 60 * 24))
        this.setState({ userName: user.name })

        let url = APIS.blogList.devUrl + '?pageIndex=1&pageSize=10&user=' + user.name
        axios.get(url).then(res => {
            console.log('res', res.data)
            this.props.dispatch(initBlogs(res.data, true))
            this.props.dispatch(hasMoreBlogItem(true))
            this.setState({ ProgressPercent: 100 })
            if (this.props.store.blogs.length > 0) {
                // setInterval(() => { this.setState({ ProgressPercent: 100 }) }, 1000)
                // todo:将进度条从layout的state转移到store中
            }
            else {
                message.warning('server err!!!')
            }

        })
    }

    render() {
        const { Header, Content, Footer } = Layout;

        const dropdownClick = ({ key }) => {
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
        }

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
                                defaultSelectedKeys={['/app/blogall']}
                                selectedKeys={[this.props.history.location.pathname]}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key={['/app/blogall']}>
                                    <Link to={{ pathname: '/app/blogall', state: this.props.store.blogs }} onClick={this.initBlogAllData}>All Blogs</Link>
                                </Menu.Item>
                                <Menu.Item key={['/app/myblog']} style={{ display: this.state.isLogin == true ? '' : 'none' }} onClick={this.intiMyBlogData}>
                                    <Link to={'/app/myblog'}  >My Blogs</Link>
                                </Menu.Item>
                                <Menu.Item key={['/app/writeblog']} style={{ display: this.state.isLogin == true ? '' : 'none' }}>
                                    <Link to={'/app/writeblog'}>Write Blog</Link>
                                </Menu.Item>
                                <Menu.Item key={['4']} style={{ display: 'none' }}>
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
                                    <h3 className="head-userName" > Hello: {this.state.isLogin === true ? JSON.parse(getLocalStorage('user', 1000 * 60 * 60 * 24)).name : ''}</h3>
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>
                {/* 进度条 */}
                {this.state.ProgressPercent === 100 ? null : <Progress percent={this.state.ProgressPercent} status="active" showInfo={false} type="line" strokeWidth={5} style={{ marginTop: '-10px', marginBottom: '-5px' }} strokeColor="#63B8FF" />}
                <Content style={{ padding: '10px 200px' }}>
                    <BreadcrumbCusstom />
                    <div style={{ background: '#fff', padding: '24px', minHeight: '280px' }} >
                        {this.state.ProgressPercent === 100 ?
                            < Switch >
                                <Route exact path='/app' component={Home} />
                                <Route exact path="/app/myblog" component={MyBlog} />
                                <Route exact path="/app/writeblog" component={WriteBlog} />
                                <Route exact path="/app/blogall" component={BlogAll} ></Route>
                                <Route exact path="/app/blogall/blogdetail/:id" component={BlogDetail}></Route>
                                <Route exact path="/app/blogall/blogfilter" component={BlogFilterByTags}></Route>
                            </Switch>
                            :
                            <div>
                                <Skeleton avatar paragraph={{ rows: 4 }} />
                                <Skeleton avatar paragraph={{ rows: 4 }} />
                                <Skeleton avatar paragraph={{ rows: 4 }} />
                                <Skeleton avatar paragraph={{ rows: 4 }} />
                            </div>
                        }


                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>

                    ©2019 Created by laya Studio
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
                        {this.state.uploadAvatarVisible === true ? <UploadAvatarComponent handleClose={this.handleCloseUploadAvatar} /> : null}
                    </Modal>
                </div>
                <div>
                    {/* 修改密码模态框 */}
                    <Modal
                        width={"50%"}
                        title="Change Password"
                        visible={this.state.changePassVisible}
                        onOk={this.handleOk}
                        footer={null}
                        closable={false}
                        onCancel={this.handleChangePassClose}
                    >
                        {this.state.changePassVisible === true ? <ChangePass handleCloseChangePass={this.handleChangePassClose} /> : null}
                    </Modal>
                </div>

            </Layout >
        )
    }
}
let mapStateToProps = (state) => {
    return {
        store: state
    }
};

export default withRouter(connect(mapStateToProps)(LayoutComponent));