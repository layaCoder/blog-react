import React, { Component } from 'react'
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown, Row, Col, Modal, Input, message, Skeleton, Progress } from 'antd';
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
import MessageBoard from './MessageBoard'
import TagsBoard from './parts/TagsBoard'

import { getLocalStorage } from '../utils/commUtils'
import { userLogin, userLogout, hasMoreBlogItem, initBlogs, isShowLoading } from '../store/actions';

import axios from 'axios'
import APIS from '../api/index'
import { IsPC } from '../utils/commUtils'
import BlogBySearch from './BlogBySearch';
import AsideMenu from './parts/AsideMenu'
import logoUrl from '../assets/img/logo2.png';


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
            isPc: true, //模式是pc端进入
            showAside: false
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
        if (!IsPC()) {
            this.setState({ isPc: false })
        }

        //通过 url 包含string来判断加载的数据
        if (this.props.location.pathname.includes('blogall') && this.props.location.pathname.indexOf('blogfilter') === -1) {
            this.initBlogAllData()
        }
        else if (this.props.location.pathname.includes('myblog')) {
            this.initMyBlogData()
        }
        else if (this.props.location.pathname.includes('writeblog')) {
            this.props.dispatch(isShowLoading(false))
        }
        else if (this.props.location.pathname.includes('blogfilter')) {
            //获取 url 中 最后一个斜杠后面的 string ， 及【tag】 标签
            let index = this.props.location.pathname.lastIndexOf("\/");
            let tag = this.props.location.pathname.substring(index + 1, this.props.location.pathname.length)
            this.initBlogByTag(tag)
        }
        else if (this.props.location.pathname.includes('blogbysearch')) {
            let paramStrIndex = this.props.location.pathname.lastIndexOf("\/")
            let serachParam = this.props.location.pathname.substring(paramStrIndex + 1, this.props.location.pathname.length)
            this.handleSearch(serachParam)
        }



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

    //初始化 blogAll数据
    initBlogAllData = () => {
        this.props.dispatch(hasMoreBlogItem(true))
        this.props.dispatch(isShowLoading(true))

        //加载页面数据
        let url = APIS.blogList.devUrl + '?pageIndex=1&pageSize=10'

        axios.get(url).then(res => {

            this.props.dispatch(initBlogs(res.data, true))
            this.props.dispatch(isShowLoading(false))
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

    //初始化myBlog数据
    initMyBlogData = () => {
        if (!getLocalStorage('user', 1000 * 60 * 60 * 24)) {
            this.props.history.push({
                pathname: '/app/blogall'
            })
            window.location.reload();
        }
        else {
            this.props.dispatch(hasMoreBlogItem(true))
            this.props.dispatch(isShowLoading(true))
            let user = JSON.parse(getLocalStorage("user", 1000 * 60 * 60 * 24))
            this.setState({ userName: user.name })

            let url = APIS.blogList.devUrl + '?pageIndex=1&pageSize=10&user=' + user.name
            axios.get(url).then(res => {
                console.log('res', res.data)
                this.props.dispatch(initBlogs(res.data, true))
                /*initBlogs(data,flag)   flag===true 表示是第一次初始化数据，需要清空blog数组， flag===false表示是后续懒加载的数据，push到blog数组中*/
                this.props.dispatch(hasMoreBlogItem(true))
                this.props.dispatch(isShowLoading(false))
                if (this.props.store.blogs.length > 0) {

                }
                else {
                    message.warning('server err!!!')
                }

            })
        }

    }

    //初始化tag过去的blogList   !!!!此方法作用于 避免F5后状态丢失
    initBlogByTag = (tag) => {
        this.props.dispatch(hasMoreBlogItem(true))
        this.props.dispatch(isShowLoading(true))
        // let user = JSON.parse(getLocalStorage("user", 1000 * 60 * 60 * 24))

        let url = APIS.blogListByTag.devUrl + '?pageIndex=1&pageSize=10&tag=' + tag
        axios.get(url).then(res => {
            this.props.dispatch(initBlogs(res.data, true)) //initBlogs(data,flag)   flag===true 表示是第一次初始化数据，需要清空blog数组， flag===false表示是后续懒加载的数据，push到blog数组中
            this.props.dispatch(hasMoreBlogItem(true))
            this.props.dispatch(isShowLoading(false))
            if (this.props.store.blogs.length > 0) {
                // setInterval(() => { this.setState({ ProgressPercent: 100 }) }, 1000)
                // todo:将进度条从layout的state转移到store中
            }
            else {
                message.warning('server err!!!')
            }
        })
    }

    //搜索事件跳转
    handleSearch = (value) => {
        this.setState({ ProgressPercent: 60 })
        let url = APIS.blogListBySearch.devUrl + '?pageIndex=1&pageSize=10&param=' + value
        this.setState({ ProgressPercent: 80 })
        axios.get(url).then(res => {
            if (res.data.length > 0 && value) {
                this.props.dispatch(hasMoreBlogItem(true))
                this.props.dispatch(initBlogs(res.data, true))
                this.setState({ ProgressPercent: 100 })
                this.props.history.push({
                    pathname: '/app/blogbysearch/' + value
                })
            } else {
                message.warning('No results!')
                this.setState({ ProgressPercent: 100 })
            }
        })

    }

    //显示/隐藏AsideMenu
    showAside = () => {
        this.setState({ showAside: !this.state.showAside })
    }
    //点击遮罩层隐藏侧导航
    hideCover = () => {
        if (this.state.showAside) {
            this.showAside()
        }
        else {
            return
        }
    }

    render() {
        const { Header, Content, Footer } = Layout;
        const Search = Input.Search

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
            <div>
                <AsideMenu showAside={this.state.showAside} toggleAside={this.showAside} onClick={this.hideCover} />
                <div className={this.state.showAside ? "mobile-aside-wrap" : ""} onClick={this.hideCover}>
                    <Layout className="layout">
                        <Header>
                            <Row>
                                <Col span={1}>
                                    {/* <Button type="primary" onClick={this.showAside} style={{ marginBottom: 16, width: "50px" }} ><Icon type='menu-unfold' /></Button> */}
                                    <img src={logoUrl} style={{ width: '70%', height: '70%', cursor: 'pointer' }} onClick={this.showAside} />
                                </Col>

                                <Col span={14}>
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
                                        <Menu.Item key={['/app/myblog']} style={{ display: this.state.isLogin == true ? '' : 'none' }} onClick={this.initMyBlogData}>
                                            <Link to={'/app/myblog'}  >My Blogs</Link>
                                        </Menu.Item>
                                        <Menu.Item key={['/app/writeblog']} style={{ display: this.state.isLogin == true ? '' : 'none' }}>
                                            <Link to={'/app/writeblog'}>Write Blog</Link>
                                        </Menu.Item>
                                        <Menu.Item key={['4']} style={{ display: 'none' }}>
                                            <Link to={'/app/blogall/blogdetail'}>Blog Detail</Link>
                                        </Menu.Item>
                                        <Menu.Item key={['4']} style={{ display: 'none' }}>
                                            <Link to={'/app/blogall/blogfilter'}>Blog Filter By Tag</Link>
                                        </Menu.Item>
                                    </Menu>
                                </Col>
                                <Col span={6}>
                                    <Search
                                        placeholder="Search in laya's Blog"
                                        onSearch={value => this.handleSearch(value)}
                                        style={{ width: '200px' }}
                                    />
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
                                            <h3 className="head-userName" > Hello: {this.props.store.isLogin.login === true ? this.props.store.isLogin.userName : ''}</h3>
                                        </a>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Header>
                        {/* 进度条 */}
                        {this.state.ProgressPercent === 100 ? null : <Progress percent={this.state.ProgressPercent} status="active" showInfo={false} type="line" strokeWidth={5} style={{ marginTop: '-10px', marginBottom: '-5px' }} strokeColor="#63B8FF" />}
                        <Row>
                            <Col span={this.state.isPc ? 12 : 22} offset={this.state.isPc ? 3 : 1}>
                                <Content>
                                    <BreadcrumbCusstom />
                                    <div style={{ background: '#fff', padding: '24px', minHeight: '280px' }} >
                                        {this.props.store.showLoading === false ?
                                            < Switch >
                                                <Route exact path='/app' component={Home} />
                                                <Route exact path="/app/myblog" component={MyBlog} />
                                                <Route exact path="/app/writeblog" component={WriteBlog} />
                                                <Route exact path="/app/blogall" component={BlogAll} ></Route>
                                                <Route exact path="/app/blogall/blogdetail/:id" component={BlogDetail} ></Route>
                                                <Route exact path="/app/blogall/blogfilter/:tag" component={BlogFilterByTags}  ></Route>
                                                <Route exact path="/app/blogbysearch/:param" component={BlogBySearch}></Route>
                                                <Route exact path="/app/messageboard" component={MessageBoard}></Route>
                                            </Switch>
                                            :
                                            <div>
                                                <Skeleton active avatar paragraph={{ rows: 4 }} />
                                                <Skeleton active avatar paragraph={{ rows: 4 }} />
                                                <Skeleton active avatar paragraph={{ rows: 4 }} />
                                                <Skeleton active avatar paragraph={{ rows: 4 }} />
                                            </div>
                                        }
                                    </div>
                                </Content>
                            </Col>
                            {this.state.isPc ? <Col span={7}>
                                <div>
                                    <TagsBoard />
                                </div>
                            </Col> : null}
                        </Row>
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
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        store: state
    }
};

export default withRouter(connect(mapStateToProps)(LayoutComponent));