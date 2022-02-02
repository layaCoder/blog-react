import React, { Component } from "react";
import { Row, Col, Avatar, Input, Button } from "antd";
import axios from "axios";
import APIS from "../api/index";
require("../assets/styles/MessageBoard.scss");
import emojiPack from "../api/emojiUrl";
import * as untils from "../utils/commUtils.js";
import E from "wangeditor";

import MsgBoardItem from "./parts/MsgBoardItem";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      msgText: "",
      msgData: [],
    };
  }

  initMsgList = () => {
    let url = APIS.getMsgList.devUrl + "?pageIndex=" + 1 + "&pageSize=10";
    axios.get(url).then((res) => {
      console.log("res", res);
      this.setState({ msgData: res.data });
    });
  };

  componentDidMount() {
    this.initEditor();
    this.initMsgList();
  }

  initEditor() {
    const toolBar = this.refs.editorMenu;
    const elem = this.refs.editorElem;
    const editor = new E(toolBar, elem);

    this.editor = editor;
    editor.customConfig.emotions = [
      {
        // tab 的标题
        title: "emoji",
        // type -> 'emoji' / 'image'
        type: "emoji",
        // content -> 数组
        content: [
          "😀",
          "😁",
          "😂",
          "🤣",
          "😃",
          "😄",
          "😅",
          "😆",
          "😉",
          "😊",
          "😋",
          "😎",
          "😍",
          "😘",
          "😗",
          "",
          "😚",
          "🙂",
          "🤗",
          "🤔",
          "😐",
          "😑",
          "😶",
          "🙄",
          "😏",
          "😣",
          "😥",
          "😮",
          "🤐",
          "😯",
          "😪",
          "",
          "😴",
          "😌",
          "😛",
          "😜",
          "😝",
          "🤤",
          "😒",
          "🤓",
          "😈",
          "👿",
          "👹",
          "👺",
          "💀",
          "👻",
          "👽",
          "🤖",
          "💩",
          "😺",
          "😸",
          "😹",
          "😻",
          "😼",
          "😽",
          "🙀",
          "😿",
          "😾",
        ],
      },
      //从api地址加载表情包
      emojiPack,
    ];

    editor.customConfig.zIndex = 100;

    editor.customConfig.menus = [
      "bold", // 粗体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "emoticon", // 表情
    ];
    editor.customConfig.lang = {
      设置标题: "Title",
      字号: "Size",
      文字颜色: "Color",
      设置列表: "List",
      有序列表: "",
      无序列表: "",
      对齐方式: "Align",
      靠左: "",
      居中: "",
      靠右: "",
      正文: "p",
      链接文字: "link text",
      链接: "link",
      上传图片: "Upload",
      网络图片: "Web",
      图片link: "image url",
      插入视频: "Video",
      格式如: "format",
      上传: "Upload",
      创建: "init",
    };
    editor.create();
  }

  inputAuthor = (e) => {
    this.setState({ author: e.target.value });
  };

  handleSubmit = () => {
    if (
      !this.state.author ||
      untils.delHtmlTag(this.editor.txt.html()).length < 2
    ) {
      alert("author or content can not be null!!!");
      return;
    }

    /* 获取文本编辑器value */
    let htmlStr = this.editor.txt.html();
    let postUrl = APIS.saveBoardMsg.devUrl;
    let role = this.state.author === "laya" ? 0 : 1;
    let avatarUrl;
    axios({
      method: "post",
      url: postUrl,
      headers: {
        "Content-type": "application/json",
      },
      data: {
        author: this.state.author,
        content: htmlStr,
        role: role,
        avatarUrl: avatarUrl,
      },
    }).then((res) => {
      this.editor.txt.html(""); //清空编辑器
      this.initMsgList();
    });
  };

  render() {
    return (
      <div className="msgBoard-div">
        <Row className="msgBoard-row">
          <h2 className="msgBoard-title">Message Board</h2>
        </Row>

        <Row className="msgBoard-row">
          {this.state.msgData.map((item) => {
            return <MsgBoardItem msgItem={item} />;
          })}
        </Row>
        {/* 文本编辑器，todo：换成 markdown */}
        <Row className="msgBoard-row">
          <Row className="input-name-row">
            <Col span={2} offset={1}></Col>
            <Col span={20}>
              <Input
                placeholder="plz input your name"
                onChange={this.inputAuthor}
                value={this.state.author}
              />
            </Col>
          </Row>
          <Row>
            <Col span={20} offset={3}>
              <div>
                <div
                  ref="editorMenu"
                  style={{
                    backgroundColor: "#FAFAFA",
                    border: "solid 1px #d9d9d9",
                    borderRadius: "5px 5px 0px 0px",
                  }}
                ></div>
              </div>
              <div
                style={{
                  border: "#d9d9d9 solid 1px",
                  borderTop: "0px",
                  borderRadius: "0px 0px 5px 5px",
                }}
              >
                <div
                  ref="editorElem"
                  style={{
                    textAlign: "left",
                    height: "200px",
                    maxHeight: "500px",
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col offset={22} span={1}>
              <div className="submit-btn">
                <Button onClick={this.handleSubmit}>Submit</Button>
              </div>
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}
