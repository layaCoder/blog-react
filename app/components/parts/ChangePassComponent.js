import React, { Component } from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';

class ChangePasswordComponent extends Component {
    componentDidMount() {

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (values.NewPassword !== values.ConfirmNewPassword) {
                message.error('New Password are not the same');
                return
            }
            if (!err) {
                console.log('Received values of form: ', values);
                // todo:post form to backend

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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
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
                    <Form.Item>
                        <Button type="default" onClick={this.handleCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrappedChangePassForm = Form.create({ name: 'register' })(ChangePasswordComponent);
export default WrappedChangePassForm