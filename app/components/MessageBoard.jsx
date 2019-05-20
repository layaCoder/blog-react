import React, { Component } from 'react'
import { Row, Col, Avatar, Input, Button } from 'antd';
import axios from 'axios'
import APIS from '../api/index'
require('../assets/styles/MessageBoard.scss')
import emojiPack from '../api/emojiUrl'
import * as untils from '../utils/commUtils.js'
import E from 'wangeditor'


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            author:'',
            msgText:'',
            msgData: []
        }
    }

    componentDidMount() {
        this.initEditor()
    }

    initEditor() {
        const toolBar = this.refs.editorMenu
        const elem = this.refs.editorElem
        const editor = new E(toolBar, elem)

        this.editor = editor
        editor.customConfig.emotions = [

            {
                // tab 的标题
                title: 'emoji',
                // type -> 'emoji' / 'image'
                type: 'emoji',
                // content -> 数组
                content: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘',
                    '😗', '😙', '😚', '🙂', '🤗', '🤔', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯',
                    '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '🤓', '😈', '👿', '👹', '👺', '💀', '👻',
                    '👽', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾']
            },
            //从api地址加载表情包
            emojiPack
        ]


        editor.customConfig.zIndex = 100
        editor.customConfig.uploadImgServer = APIS.saveBlogImage.devUrl
        // 限制一次最多上传 1 张图片
        editor.customConfig.uploadImgMaxLength = 1
        // editor.customConfig.uploadFileName = 'yourFileName' //设置文件名
        editor.customConfig.customUploadImg = function (files, insert) {
            // files 是 input 中选中的文件列表
            console.log(files)
            if (files[0]) {
                const formData = new window.FormData()
                formData.append('file', files[0], 'cover.jpg') //将文件传入到fomData中
                instanceAxios({
                    method: "post",
                    url: APIS.saveBlogImage.devUrl,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        //'Content-type': 'application/x-www-form-urlencoded'
                        //'Content-type': 'application/json'
                    },
                    data: formData,
                }
                ).then(res => {
                    if (res.data[0]) {
                        insert(res.data[0].imageUrl) //上传服务器后，将url地址返回，插入html片段中
                    }
                    else {
                        console.log(res.data)
                    }
                })
            } else {
                message.info('plz choose your picture！')
            }
        }
        editor.customConfig.menus = [
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            // 'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            'emoticon', // 表情
            'image', // 插入图片
            // 'table', // 表格
            // 'video', // 插入视频
            'code', // 插入代码
            //'undo', // 撤销
            // 'redo' // 重复
        ]
        editor.customConfig.lang = {
            '设置标题': 'Title',
            '字号': 'Size',
            '文字颜色': 'Color',
            '设置列表': 'List',
            '有序列表': '',
            '无序列表': '',
            '对齐方式': 'Align',
            '靠左': '',
            '居中': '',
            '靠右': '',
            '正文': 'p',
            '链接文字': 'link text',
            '链接': 'link',
            '上传图片': 'Upload',
            '网络图片': 'Web',
            '图片link': 'image url',
            '插入视频': 'Video',
            '格式如': 'format',
            '上传': 'Upload',
            '创建': 'init'
        }
        editor.create()
    }

    inputAuthor=(e)=>{
        this.setState({author:e.target.value})
    }
    
    handleSubmit=()=>{
        let htmlStr=this.editor.txt.html()
        console.log('htmlStr=====>',htmlStr)
    }

    render() {

        return (
            <div className='msgBoard-div'>
                <Row className='msgBoard-row'>
                    <h2 className='msgBoard-title'>Message Board</h2>
                </Row>
                <Row className='msgBoard-row'>
                    <div>msgBoard item</div>
                    <div>msgBoard item</div>
                    <div>msgBoard item</div>
                </Row>
                <Row className='msgBoard-row'>
                    <Row className='input-name-row'>
                        <Col span={2} offset={1}>
                            <Avatar src='http://39.105.188.13:2000/images/laya.png'></Avatar>
                        </Col>
                        <Col span={20}>
                            <Input placeholder='plz input your name' onChange={this.inputAuthor} value={this.state.author}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20} offset={3}>
                            <div>
                                <div ref="editorMenu" style={{ backgroundColor: '#FAFAFA', border: 'solid 1px #d9d9d9', borderRadius: '5px 5px 0px 0px' }}></div>
                            </div>
                            <div style={{ border: '#d9d9d9 solid 1px', borderTop: '0px', borderRadius: '0px 0px 5px 5px' }}>
                                <div ref='editorElem' style={{ textAlign: 'left', height: '200px', maxHeight: '500px' }} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={22} span={1} >
                            <div className='submit-btn'>
                                <Button onClick={this.handleSubmit}>Submit</Button>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </div>
        )
    }
}