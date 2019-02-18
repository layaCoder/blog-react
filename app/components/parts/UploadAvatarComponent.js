import { Upload, Icon, message, Slider, Button, Alert, Divider, Row, Col } from 'antd';
import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'
import * as Utils from '../../utils/commUtils'
import axios from 'axios';
import APIS from '../../api/index';
import * as storage from '../../utils/commUtils'
require('../../assets/styles/DialogForm.css')

/* 
  头像上传，使用控件   1、antd upload控件  2、react-avatar-editor  github:https://github.com/layaCoder/react-avatar-editor
  参考文档 https://blog.csdn.net/song279811799/article/details/79055651
*/

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
        message.error('Image must smaller than 20MB!');
    }

    return isJPG && isLt2M;
}


export default class Avatar extends React.Component {
    state = {
        loading: false,
        scale: 1.2,
        imageUrl: '',
        resultBase64Img: '',
        alertVisible: false
    };

    handleClose = () => {
        this.setState({ alertVisible: false });
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            //用beforeUpload方法验证图片
            if (!beforeUpload(info.file.originFileObj)) return
            // 不使用 antd 组件的自动请求
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));

            this.setState({ loading: true });
            return;
            // getBase64(info.file.originFileObj, imageUrl => this.setState({
            //     imageUrl,
            //     loading: false,
            // }));
            // console.log(this.state)
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    handleSliderChange = (value) => {
        this.setState({ scale: value })
    }

    /*
    issue:上传头像此方法会调用两次
    第一次在upload组件里的 customRequest 方法里调用，因为 !this.state.imageUrl 判断原图片为空，所以直接return
    第二次在 saveButton 调用，因为 通过 handleChange方法将base64的图片赋值给了 state.imge，所以跳过第一个 if判断，执行后续动作
    */
    //头像保存
    onClickSave = () => {
        //如果antd upload控件没有绑定图片值
        if (!this.state.imageUrl) {
            //message.error('Avatar img can not be null');
            return
        }
        else if (this.editor) {
            console.log('this.state.imgUrl', this.state.imageUrl)
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            const canvas = this.editor.getImage()
            console.log('canvas', canvas)
            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            const canvasScaled = this.editor.getImageScaledToCanvas()
            this.setState({ resultBase64Img: Utils.getBase64Image2(canvas) })
            console.log('result img base64', Utils.getBase64Image2(canvas)) //[question] 直接调用state，第一次数据为 undefined 第二次成功 
            let url = APIS.saveAvatar.devUrl
            axios({
                method: "post",
                url: url,
                headers: {
                    // 'Content-type': 'application/x-www-form-urlencoded'
                    'Content-type': 'application/json'
                },
                data: {
                    user: storage.getLocalStorage('user', 1000 * 60 * 60 * 24),
                    base64: Utils.getBase64Image2(canvas)
                },
                // transformRequest: [function (data) {
                //     let ret = ''
                //     for (let it in data) {
                //         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                //     }
                //     return ret
                // }],
            }).then((res) => {
                console.log(res.data);
                //保存图片url未变，服务器同名头像图片已经更改，所以需要刷新页面来加载新头像
                window.location.reload();
            })
        }
        //调用父组件方法关闭dialog
        this.setState({
            imageUrl: '',
            resultBase64Img: ''
        })
        this.props.handleClose()
    }

    handleCancel = () => {
        this.setState({
            imageUrl: '',
            resultBase64Img: ''
        })
        this.props.handleClose()
    }


    setEditorRef = (editor) => this.editor = editor

    render() {


        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;

        return (
            <div>
                {
                    this.state.alertVisible ? (<Alert
                        message="Avatar can not be null"
                        type="error"
                        closable
                        afterClose={this.handleClose}
                    />) : null
                }
                <Row>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        // action="//jsonplaceholder.typicode.com/posts/" //antd 测试用请求地址
                        action='#'
                        customRequest={this.onClickSave} //屏蔽upload组件封装的自动上传
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                    >
                        {/* {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton} */}
                        {imageUrl ? '' : uploadButton}

                    </Upload>
                </Row>
                <Row>
                    <div style={{ "display": this.state.imageUrl ? '' : 'none' }}>
                        <AvatarEditor
                            ref={this.setEditorRef}
                            image={this.state.imageUrl}
                            width={250}
                            height={250}
                            border={50}
                            color={[255, 255, 255, 0.6]} // RGBA
                            // scale={1.2}
                            scale={parseFloat(this.state.scale)}
                            borderRadius={200}
                            rotate={0}
                        />
                        <Slider
                            step={0.01}
                            value={this.state.scale}
                            disabled={false}
                            onChange={this.handleSliderChange}
                            mini={1}
                            max={2}
                        />
                    </div>
                </Row>
                <Divider />
                <Row>
                    <Button type="primary" onClick={this.onClickSave} className="formBtn">&nbsp;Save&nbsp;</Button>
                    <Button onClick={this.handleCancel} className="formBtn">Cancel</Button>
                </Row>

            </div >
        );
    }
}

