import React, { Component } from 'react'
import { Form, Input, Button, message, Divider } from 'antd';
import * as asyncFunc from '../../utils/ayncFunc'
import APIS from '../../api/index'

require('../../assets/styles/DialogForm.css')

class ChangePasswordComponent extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true })
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            //判断input是否为空
            if (!values.password || !values.NewPassword || !values.ConfirmNewPassword) {
                this.setState({ isLoading: false })
            }
            if (values.NewPassword !== values.ConfirmNewPassword) {
                message.error('New Password are not the same');
                this.setState({ isLoading: false })
                return
            }
            if (!err) {
                console.log('Received values of form: ', values);
                //  await必须配合async使用，在14行的匿名方法中 添加【async】声明异步方法
                let data = {
                    password: values.password,
                    NewPassword: values.NewPassword,
                    ConfirmNewPassword: values.ConfirmNewPassword
                }
                // let result = this.postDataFunc(APIS.changePassword.devUrl, data)
                let result = await asyncFunc.postData(APIS.changePassword.devUrl, data)
                console.log('post res=>', result)
                if (result.nModified === 0) {
                    message.error('Wrong password!!!')
                    this.setState({ isLoading: false })
                    return
                }
                else if (result.nModified === 1) {
                    message.success('Password has been changed')
                }
                //调用父组件方法关闭模态框
                this.props.handleCloseChangePass()
            }
        });
    }

    handleCancel = () => {
        this.props.handleCloseChangePass()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };


        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="Password"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input password',
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="New Password"
                    >
                        {getFieldDecorator('NewPassword', {
                            rules: [{
                                required: true, message: 'Please input new password',
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Confirm New Password"
                    >
                        {getFieldDecorator('ConfirmNewPassword', {
                            rules: [{
                                required: true, message: 'Please input new password again',
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </Form.Item>
                    {/* <Form.Item {...tailFormItemLayout}> */}
                    <Divider />
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="formBtn" loading={this.state.isLoading}>Save</Button>
                        <Button type="default" onClick={this.handleCancel} className="formBtn">Cancel</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrappedChangePassForm = Form.create({ name: 'register' })(ChangePasswordComponent);
export default WrappedChangePassForm