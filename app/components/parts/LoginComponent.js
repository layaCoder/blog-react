import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import APIS from '../../api/index';

import * as storage from '../../utils/commUtils'

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let loginApi = APIS.userLogin.devUrl + "?name=" + values.userName + "&pass=" + values.password
                axios.get(loginApi).then(res => {
                    console.log(res)
                    if (res.data.length > 0) {
                        //登录后将 user 存放到 localStorage
                        let user = JSON.stringify({ isLogin: true, name: values.userName })
                        storage.setLocalStorage("user", user)
                        this.props.history.push('/app/blogall')

                        //调用父辈方法关闭模态框
                        this.handleCancel()
                        //改变父组件state，显示登陆后内容
                        this.showLoginRoot()
                    }
                    else {
                        message.error('name or password is wrong!!!');
                    }
                })

                // if (values.userName === 'laya' && values.password === '111') {
                //     //登录后将 user 存放到 localStorage
                //     let user = JSON.stringify({ isLogin: true, name: values.userName })
                //     storage.setLocalStorage("user", user)
                //     this.props.history.push('/app/blogall')

                //     //调用父辈方法关闭模态框
                //     this.handleCancel()
                //     //改变父组件state，显示登陆后内容
                //     this.showLoginRoot()
                // }
            }
        });
    }

    handleCancel = () => {
        this.props.handleCancel()
    }

    showLoginRoot = () => {
        this.props.showLoginRoot()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {/* {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )} */}
                    {/* <a className="login-form-forgot" href="">Forgot password</a> */}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Login
            </Button>
                    {/* Or <a href="">register now!</a> */}
                </Form.Item>
            </Form>
        );
    }
}

export default withRouter(Form.create()(NormalLoginForm));

