/*
@使用React Draft Wysiwyg  markdown控件
参考文档：https://blog.csdn.net/genius_yym/article/details/82776430
控件网站：https://jpuri.github.io/react-draft-wysiwyg/#/docs
控件github：https://github.com/jpuri/react-draft-wysiwyg
*/


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../store/actions'
import { Row, Input, message, Button, Tag, Col } from 'antd';
import 'antd/dist/antd.css';

import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import * as untils from '../utils/commUtils.js'
require('../assets/styles/WriteBlog.css')

import axios from 'axios';
import APIS from '../api/index';

const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['Frontend', 'Backend', 'IOS', 'Android', 'Design', 'DevTool', 'LifeStyle'];

class WriteBlog extends Component {
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
            title: null,
            selectedTags: [],
        }
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
        let markDownText = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
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
                // 'Content-type': 'application/x-www-form-urlencoded'
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
                editorState: EditorState.createEmpty(),
                title: '',
                selectedTags: []
            })
            message.success('blog saved', 3);
            //////////////////////////
        }
        ).catch(err => { console.log(err) })


    };


    render() {
        const { editorState } = this.state;
        const { TextArea } = Input;

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
                        <Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange.bind(this)} />
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
                    <Row className="row">
                        <p>let's see the html vison ^^</p>
                        <TextArea
                            className="showHtmlDom"
                            disabled
                            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                        />
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
