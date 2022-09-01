import React, { Component } from "react";
import { Row, Col, Avatar, Input, Button } from "antd";
import axios from "axios";
import APIS from "../api/index";
require("../assets/styles/MessageBoard.scss");
import emojiPack from "../api/emojiUrl";
import * as untils from "../utils/commUtils.js";

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

  componentDidMount() {}

  inputAuthor = (e) => {
    this.setState({ author: e.target.value });
  };

  handleSubmit = () => {};

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
