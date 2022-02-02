import React, { Component } from "react";
import { Tag, Row, Col, Avatar, Tooltip, Modal, Input, Button } from "antd";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";
import * as untils from "../../utils/commUtils";
import APIS from "../../api/index";
import axios from "axios";
require("../../assets/styles/MessageBoard.scss");

class MsgBoardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      btnReplyLoading: false,
    };
  }

  clickReplay = () => {
    this.setState({ showReplyDialog: true });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      inputReply: "",
    });
  };

  onChange = (e) => {
    this.setState({ inputReply: e.target.value });
  };

  btnSaveReply = (msgItem) => {
    console.log("btnSaveReply running", msgItem);
    this.setState({ btnReplyLoading: true });
    let postUrl = APIS.saveMsgReply.devUrl;
    console.log("postUrl....>", postUrl);
    axios({
      method: "post",
      url: postUrl,
      headers: {
        "Content-type": "application/json",
      },
      data: {
        author: "laya", //回复功能暂时只支持登录后回复
        msgId: msgItem._id,
        content: this.state.inputReply,
      },
    }).then((res) => {
      console.log("save rply result...>", res);
      this.setState({ btnReplyLoading: false });
    });
  };

  render() {
    const { TextArea } = Input;
    const { visible, confirmLoading } = this.state;
    const { msgItem } = this.props;
    if (!msgItem) return null;

    return (
      <div>
        <Row>
          <Row className="msgBoardItem-row">
            <Row>
              <div className="msgBoardItem-col"></div>
              <div className="msgBoardItem-col">
                <strong>{this.props.msgItem.author}</strong>
              </div>
              <div className="msgBoardItem-col">
                <Tooltip
                  title={moment(this.props.msgItem.date).format("LLLL")}
                  className="dateTip"
                >
                  <span>{moment(this.props.msgItem.date).fromNow()}</span>
                </Tooltip>
              </div>
            </Row>
            <Row>
              <div
                className="msgBoardItem-content"
                dangerouslySetInnerHTML={{ __html: this.props.msgItem.content }}
              ></div>
            </Row>
            <Row>
              {this.props.msgItem.replys.map((item) => {
                return <div>{item.replyContent}</div>;
              })}
            </Row>
            <Row>
              <Col span={2} offset={2}>
                <span
                  className="msgBoardItem-reply-btn"
                  onClick={this.showModal}
                >
                  reply
                </span>
              </Col>
            </Row>
          </Row>
        </Row>
        {/* 回复 Modal 对话框 */}
        <div>
          <Modal
            visible={visible}
            // onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <p>reply to @{this.props.msgItem.author}</p>
            <TextArea
              value={this.state.inputReply}
              onChange={this.onChange}
              placeholder="Plz input your reply"
              autosize={{ minRows: 3, maxRows: 5 }}
            />
            <Row style={{ marginTop: "2%" }}>
              <Col span={2} offset={21}>
                <Button
                  type="default"
                  size="small"
                  onClick={() => {
                    this.btnSaveReply(this.props.msgItem);
                  }}
                  loading={this.state.btnReplyLoading}
                >
                  {" "}
                  Save{" "}
                </Button>
              </Col>
            </Row>
          </Modal>
        </div>
      </div>
    );
  }
}

export default MsgBoardItem;
