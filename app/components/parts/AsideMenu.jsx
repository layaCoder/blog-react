import React, { Component } from 'react'
import { Menu, Icon, Button, Col, Row } from 'antd';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

require('../../assets/styles/AsideMenu.scss')

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class AsideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }


    hideAside = () => {
        this.props.toggleAside()
    }


    render() {
        let myStyle = {
            textAlign: 'center'
        }
        return (
            <div className={`mobile-aside ${this.props.showAside ? "active" : null}`}>
                {/* <Col>
                    <Button onClick={this.hideAside}>Back</Button>
                </Col> */}
                <Col>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['/app/blogall']}
                        selectedKeys={[this.props.history.location.pathname]}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key={['/app/blogall']}>
                            <Link to={{ pathname: '/app/blogall', state: this.props.store.blogs }} onClick={this.initBlogAllData}>All Blogs</Link>
                        </Menu.Item>
                        <Menu.Item key={['/app/myblog']} onClick={this.initMyBlogData}>
                            <Link to={'/app/myblog'}  >My Blogs</Link>
                        </Menu.Item>
                    </Menu>
                </Col>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        store: state
    }
};

export default withRouter(connect(mapStateToProps)(AsideMenu));