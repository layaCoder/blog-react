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

    linkToHome = () => {
        this.props.history.push({ pathname: '/app' })
        this.props.toggleAside()
    }

    linkToMessageBoard = () => {
        this.props.history.push({ pathname: '/app/messageboard' })
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
                    <h2 className="aside-title">laya's Blog</h2>
                </Col>
                <Col>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[]}
                        selectedKeys={[this.props.history.location.pathname]}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key={['/app']}>
                            <a to="#" onClick={this.linkToHome}>Home Page</a>
                        </Menu.Item>
                        <Menu.Item key={['/app/messageboard']} >
                            <a to="#" onClick={this.linkToMessageBoard}>Message Board</a>
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