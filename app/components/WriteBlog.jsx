
/*第二版
//使用 wangeEditor 控件
// wangEidtor GitHub:https://github.com/wangfupeng1988/wangEditor
// wangEditor使用参考：https://blog.csdn.net/Loya0813/article/details/84391944
// nodejs接收图片参考:https://blog.csdn.net/zhongshijun521/article/details/68950873
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../store/actions'
import { Row, Input, message, Button, Tag, Col } from 'antd';
import 'antd/dist/antd.css';

import * as untils from '../utils/commUtils.js'
import E from 'wangeditor'
require('../assets/styles/WriteBlog.css')

import axios from 'axios';
import APIS from '../api/index';

const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['Frontend', 'Backend', 'IOS', 'Android', 'Design', 'DevTool', 'LifeStyle'];

//Axios开启跨域
const instanceAxios = axios.create({
    withCredentials: true
})

class WriteBlog extends Component {
    constructor() {
        super();
        this.state = {
            title: null,
            selectedTags: [],
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
            // 'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            //'emoticon', // 表情
            'image', // 插入图片
            // 'table', // 表格
            // 'video', // 插入视频
            'code', // 插入代码
            'undo', // 撤销
            'redo' // 重复
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

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
    }

    componentDidUpdate() {
    }
    onEditorStateChange(data) {
        this.setState({
            editorState: data
        });
    };

    titleChanged = (e) => {
        e.persist(); //解决 antd input 组件 value与state绑定取不到值的问题 ###important###
        this.setState({
            title: e.target.value
        })
    }

    //提交博客
    handleSubmit() {
        let markDownText = this.editor.txt.html()
        //记录下原始文本，在blogAll列表中显示
        //todo:修改redux state结构 ，确定blog数据格式
        let user = JSON.parse(untils.getLocalStorage('user', 1000 * 60 * 60 * 24));
        console.log('userInfo', user.name, user.avatar)
        if (untils.delHtmlTag(markDownText).length < 2 || !this.state.title) { // 博客内容部分用长度判断，issue：为什么 !untils.deHtmlTag(markDownText)无法实现
            message.warning('title or content can not be null')
            return
        }
        let postUrl = APIS.saveBlog.devUrl
        axios({
            method: "post",
            url: postUrl,
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                title: this.state.title,
                text: untils.delHtmlTag(markDownText),
                htmlDom: markDownText,
                user: user.name,
                avatarUrl: user.avatar,
                tags: this.state.selectedTags
            },
        }
        ).then(res => {
            console.log('return data==>', res)
            ////////////////////
            this.props.dispatch(addBlog(
                res.data.insertedId,
                this.state.title,
                untils.delHtmlTag(markDownText),
                markDownText,
                user.name,
                user.avatar,
                this.state.selectedTags,
            ))
            this.setState({
                title: '',
                selectedTags: []
            })
            this.editor.txt.html('') //清空textArea
            message.success('blog saved', 3);
            //////////////////////////
        }
        ).catch(err => { console.log(err) })


    };


    render() {

        return (
            <div>
                <Row className="row">
                    <h2 style={{ textAlign: 'center' }}>Write Blog</h2>
                </Row>
                <div>
                    <Row className="row">
                        <Input addonBefore="Title:" value={this.state.title} onChange={this.titleChanged} placeholder='plz write your blog title' />
                    </Row>
                    <Row className="row">
                        <div>
                            <div ref="editorMenu" style={{ backgroundColor: '#FAFAFA', border: 'solid 1px #d9d9d9', borderRadius: '5px 5px 0px 0px' }}></div>
                        </div>
                        <div style={{ border: '#d9d9d9 solid 1px', borderTop: '0px', borderRadius: '0px 0px 5px 5px' }}>
                            <div ref='editorElem' style={{ textAlign: 'left', height: '400px', maxHeight: '500px' }} />
                        </div>

                    </Row>
                    <Row style={{ margin: '10px 5px' }}>
                        <Col span={1}><strong>Tags:</strong></Col>
                        {tagsFromServer.map(tag => (
                            <CheckableTag
                                key={tag}
                                checked={this.state.selectedTags.indexOf(tag) > -1}
                                onChange={checked => this.handleChange(tag, checked)}
                                style={{ marginLeft: '10px' }}
                            >
                                {tag}
                            </CheckableTag>
                        ))}
                    </Row>
                    <Row className="row">
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>save</Button>
                    </Row>

                </div>
            </div >
        )
    }
}

let mapStateToProps = (state) => {
    let blogs = state;
    return blogs;
};

export default connect(mapStateToProps)(WriteBlog)
