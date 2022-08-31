/*第二版
//使用 wangeEditor 控件
// wangEidtor GitHub:https://github.com/wangfupeng1988/wangEditor
// wangEditor使用参考：https://blog.csdn.net/Loya0813/article/details/84391944
// nodejs接收图片参考:https://blog.csdn.net/zhongshijun521/article/details/68950873
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import { addBlog, userLogout } from "../store/actions";
import { Row, Input, message, Button, Tag, Col, Icon } from "antd";
import "antd/dist/antd.css";
import emojiPack from "../api/emojiUrl";

import * as untils from "../utils/commUtils.js";
import E from "wangeditor";
import { getLocalStorage } from "../utils/commUtils";
import { TweenOneGroup } from "rc-tween-one";
import MDEditor from "@uiw/react-md-editor";

import axios from "axios";
import APIS from "../api/index";

require("../assets/styles/WriteBlog.css");

const CheckableTag = Tag.CheckableTag;
const tagsFromServer = [
  "Frontend",
  "Backend",
  "CentOS",
  "JavaScript",
  "Design",
  "DevTool",
  "LifeStyle",
];

//Axios开启跨域
const instanceAxios = axios.create({
  withCredentials: true,
});

class WriteBlog extends Component {
  constructor() {
    super();
    this.state = {
      title: null,
      selectedTags: [],
      tags: [],
      inputVisible: false,
      inputValue: "",
      markDownValue: "",
    };
  }
  componentDidMount() {
    if (!getLocalStorage("user", 1000 * 60 * 60 * 24)) {
      this.props.history.push({
        pathname: "/app/blogall",
      });
      this.props.dispatch(userLogout(false));
      window.location.reload();
    }
  }

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  componentDidUpdate() {}
  onEditorStateChange(data) {
    this.setState({
      editorState: data,
    });
  }

  titleChanged = (e) => {
    e.persist(); //解决 antd input 组件 value与state绑定取不到值的问题 ###important###
    this.setState({
      title: e.target.value,
    });
  };

  //提交博客
  handleSubmit() {
    let markDownText = this.editor.txt.html();
    //记录下原始文本，在blogAll列表中显示
    //todo:修改redux state结构 ，确定blog数据格式
    let user = JSON.parse(untils.getLocalStorage("user", 1000 * 60 * 60 * 24));
    console.log("userInfo", user.name, user.avatar);
    if (untils.delHtmlTag(markDownText).length < 2 || !this.state.title) {
      // 博客内容部分用长度判断，issue：为什么 !untils.deHtmlTag(markDownText)无法实现
      message.warning("title or content can not be null");
      return;
    }
    let postUrl = APIS.saveBlog.devUrl;
    axios({
      method: "post",
      url: postUrl,
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      data: {
        title: this.state.title,
        text: untils.delHtmlTag(markDownText),
        htmlDom: markDownText,
        user: user.name,
        avatarUrl: user.avatar,
        tags: this.state.selectedTags,
        diyTags: this.state.tags,
      },
    })
      .then((res) => {
        console.log("return data==>", res);
        ////////////////////
        this.props.dispatch(
          addBlog(
            res.data.insertedId,
            this.state.title,
            untils.delHtmlTag(markDownText),
            markDownText,
            user.name,
            user.avatar,
            this.state.selectedTags
          )
        );
        this.setState({
          title: "",
          selectedTags: [],
        });
        this.editor.txt.html(""); //清空textArea
        message.success("blog saved", 3);
        //////////////////////////
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /****自定义tag------------------------------------------------- */
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  saveInputRef = (input) => (this.input = input);

  forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  setMarkDownValue = (e) => {
    this.setState({ markDownValue: e });
  };
  /*--------------------------------------------------------------- */

  render() {
    const { tags, inputVisible, inputValue, markDownValue } = this.state;
    const tagChild = tags.map(this.forMap);

    return (
      <div className="wb-contaier">
        <h2 style={{ textAlign: "center" }}>Write Blog</h2>
        <div>
          <div className="wb-title-wrapper">
            <Input
              addonBefore="Title:"
              value={this.state.title}
              onChange={this.titleChanged}
              placeholder="plz write your blog title"
            />
          </div>
          <div>
            <div data-color-mode="light" className="wb-markdown-wrapper">
              <MDEditor
                height={400}
                value={markDownValue}
                onChange={this.setMarkDownValue}
              />
            </div>
          </div>
          <div className="wb-categories-wrapper">
            <strong>Categories:</strong>
            {tagsFromServer.map((tag) => (
              <CheckableTag
                key={tag}
                checked={this.state.selectedTags.indexOf(tag) > -1}
                onChange={(checked) => this.handleChange(tag, checked)}
                style={{ marginLeft: "10px" }}
              >
                {tag}
              </CheckableTag>
            ))}
          </div>
          <div className="wb-tags-wrapper">
            <strong>Tags:</strong>
            <div style={{ display: "inline-block" }}>
              <TweenOneGroup
                enter={{
                  scale: 0.8,
                  opacity: 0,
                  type: "from",
                  duration: 100,
                  onComplete: (e) => {
                    e.target.style = "";
                  },
                }}
                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                appear={false}
              >
                {tagChild}
              </TweenOneGroup>
            </div>
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <div style={{ display: "inline-block" }}>
                <Tag
                  onClick={this.showInput}
                  style={{ background: "#fff", borderStyle: "dashed" }}
                >
                  <Icon type="plus" /> New Tag
                </Tag>
              </div>
            )}
          </div>
          <div className="wb-save-btn-wrapper">
            <Button
              type="primary"
              onClick={this.handleSubmit.bind(this)}
              className="saveBtn"
            >
              &nbsp; Save &nbsp;
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  let blogs = state;
  return blogs;
};

export default connect(mapStateToProps)(WriteBlog);
