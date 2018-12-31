import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../store/actions'
import { Row, Input, message, Button } from 'antd';
import 'antd/dist/antd.css';

import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import * as untils from '../utils/commUtils.js'
require('../assets/styles/WriteBlog.css')


class WriteBlog extends Component {
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
            title: 'plz write your blog title'
        }
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
        console.log('del', untils.delHtmlTag(markDownText))
        //todo:修改redux state结构 ，确定blog数据格式
        this.props.dispatch(addBlog(this.state.title, untils.delHtmlTag(markDownText), markDownText));
        this.setState({
            editorState: EditorState.createEmpty(),
            title: ''
        })
        message.success('blog saved', 3);
    };



    render() {
        const { editorState } = this.state;
        const { TextArea } = Input;

        return (
            <div>
                <Row className="row">
                    <h2>Write Blog</h2>
                </Row>
                <div>
                    <Row className="row">
                        <Input addonBefore="Title:" value={this.state.title} onChange={this.titleChanged} />
                    </Row>
                    <Row className="row">
                        <Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange.bind(this)} />
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
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    let blogs = state;
    return blogs;
};

export default connect(mapStateToProps)(WriteBlog)
