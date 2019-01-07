import { Upload, Icon, message, Slider, Button } from 'antd';
import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'
import * as Utils from '../../utils/commUtils'



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
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

export default class Avatar extends React.Component {
    state = {
        loading: false,
        scale: 1.2
    };

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            // 不使用 antd 组件的自动请求
            // this.setState({ loading: true });
            // return;
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
        // if (info.file.status === 'done') {
        //     // Get this url from response in real world.
        //     getBase64(info.file.originFileObj, imageUrl => this.setState({
        //         imageUrl,
        //         loading: false,
        //     }));
        //     console.log('oringi img base64', this.state)
        // }
    }

    handleSliderChange = (value) => {
        this.setState({ scale: value })
    }

    //todo: img保存，以base64格式post给后台
    //头像保存
    onClickSave = () => {
        if (this.editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            const canvas = this.editor.getImage()
            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            const canvasScaled = this.editor.getImageScaledToCanvas()
            this.setState({ resultBase64Img: Utils.getBase64Image(canvas) })
            console.log('result img base64', Utils.getBase64Image(canvas)) //[question] 直接调用state，第一次数据为 undefined 第二次成功 
        }
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
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/" //antd 测试用请求地址
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {/* {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton} */}
                    {imageUrl ? '' : uploadButton}

                </Upload>
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
                <Button type="primary" onClick={this.onClickSave}>save</Button>

            </div>
        );
    }
}