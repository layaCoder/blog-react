/*
todo: hightlight.js 后续改进
参考issuehttps://github.com/highlightjs/highlight.js/issues/925
*/

import React, { Component } from "react";
import {
  Button,
  Row,
  Col,
  Icon,
  Divider,
  Comment,
  Tooltip,
  Avatar,
  Form,
  Input,
  message,
  Skeleton,
  Popover,
} from "antd";
import moment from "moment";
import { connect } from "react-redux";
import axios from "axios";
import APIS from "../api/index";
import { saveReply } from "../store/actions";
import { get_uuid } from "../utils/commUtils";
import hljs from "highlight.js";
import shareImg from "../assets/img/share.png";
import QRCode from "qrcode.react";
require("../assets/styles/BlogDetail.scss");
const TextArea = Input.TextArea;

hljs.configure({
  classPrefix: "hljs-",
  languages: ["CSS", "HTML", "XML", "JavaScript", "Stylus", "TypeScript"],
});

class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogId: "",
      date: "",
      title: "",
      htmlDom: "",
      user: "",
      replys: [],
      isLoading: false,
      lodingHtmlDom: true,
      url: APIS.singleBlogItem.devUrl + "?blogId=" + props.match.params.id,
    };
  }

  //获取blgoDetail数据
  getDetailData = (apiUrl) => {
    axios.get(apiUrl).then((res) => {
      this.setState({
        blogId: res.data[0]._id,
        date: res.data[0].date,
        user: res.data[0].user,
        title: res.data[0].title,
        htmlDom: res.data[0].htmlDom,
        replys: res.data[0].replys,
      });
    });
  };

  componentDidMount() {
    this.updateCodeSyntaxHighlighting();
    this.getDetailData(this.state.url);
  }

  /* 处理路由id参数改变component不更新的问题 */
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps, 63);
    if (nextProps.match.params.id !== this.props.match.params.id) {
      let nextUrl =
        APIS.singleBlogItem.devUrl + "?blogId=" + nextProps.match.params.id;
      this.getDetailData(nextUrl);
    }
  }

  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }
  updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  onChangeReply = (e) => {
    this.setState({ replyText: e.target.value });
  };

  handleSubmit = () => {
    this.setState({ isLoading: true });
    let replyId = get_uuid(); //生成回复数据id

    if (this.props.store.isLogin.login === false) {
      message.warning("plz login first!");
      this.setState({ isLoading: false });
      return;
    } else if (!this.state.replyText) {
      message.warning("comment can't not be null!");
      this.setState({ isLoading: false });
      return;
    }
    axios({
      method: "post",
      url: APIS.saveBlogReply.devUrl,
      headers: {
        // 'Content-type': 'application/x-www-form-urlencoded'
        "Content-type": "application/json",
      },
      data: {
        id: replyId,
        blogId: this.props.match.params.id,
        name: this.props.store.isLogin.userName,
        avatarUrl: this.props.store.isLogin.avatarUrl,
        replyText: this.state.replyText,
      },
    })
      .then((res) => {
        //添加到store中的BlogList
        this.props.dispatch(
          saveReply(
            replyId,
            this.props.match.params.id,
            this.state.replyText,
            this.props.store.isLogin.userName,
            this.props.store.isLogin.avatarUrl
          )
        );
        this.getDetailData(this.state.url);
        this.setState({ replyText: "" });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    let myStyle = {
      textAlign: "center",
    };
    return (
      <div>
        {this.state.blogId === "" ? (
          <div>
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>
        ) : (
          <div>
            <Row>
              <Col offset={23} span={1}>
                {/*分享二维码*/}
                <Popover
                  placement="bottomLeft"
                  title={"share"}
                  content={
                    <div>
                      <QRCode
                        value={
                          "http://39.105.188.13/#/app/blogall/blogdetail/" +
                          this.state.blogId
                        }
                      />
                    </div>
                  }
                  trigger="click"
                >
                  {/* <span>-></span> */}
                  <img
                    src={shareImg}
                    style={{ width: "15px", height: "15px", cursor: "pointer" }}
                  />
                </Popover>
              </Col>
            </Row>
            <Row>
              <h2 style={myStyle}>{this.state.title}</h2>
              <Divider dashed />
            </Row>
            <Row>
              <Col span={5} offset={8}>
                <p>Author:&nbsp;{this.state.user}</p>
              </Col>
              <Col span={8}>
                <p>Date:&nbsp;{moment(this.state.date).format("LLLL")}</p>
              </Col>
              <div className="detail-divider">
                <Divider dashed />
              </div>
            </Row>
            <Row>
              <Col span={20} offset={2}>
                <div
                  dangerouslySetInnerHTML={{ __html: this.state.htmlDom }}
                ></div>
                {/* <div dangerouslySetInnerHTML={{ __html: this.state.testCode }}></div> */}
              </Col>
            </Row>

            {/* 写评论 */}
            <div className="detail-divider">
              <Divider dashed />
            </div>
            <Row className="replyArea">
              <h3 style={myStyle}>Comments</h3>
            </Row>
            <Row>
              <Col span={20} offset={2}>
                <Form.Item>
                  <TextArea
                    rows={4}
                    onChange={this.onChangeReply}
                    value={this.state.replyText}
                    placeholder="plz write some comments"
                  />
                </Form.Item>
                <Button
                  className="btnSubmit"
                  onClick={this.handleSubmit}
                  loading={this.state.isLoading}
                >
                  Submit
                </Button>
              </Col>
            </Row>
            {/* 评论显示区 */}
            <Row>
              <Col span={20} offset={2}>
                {this.state.replys.length > 0
                  ? this.state.replys.map((item) => {
                      return (
                        <Comment
                          key={item.id}
                          author={item.user}
                          avatar={
                            <Avatar src={item.avatarUrl} alt={item.user} />
                          }
                          content={<div> {item.replyText}</div>}
                          datetime={
                            <Tooltip title={moment(item.date).format("LLLL")}>
                              <span>{moment(item.date).fromNow()}</span>
                            </Tooltip>
                          }
                        />
                      );
                    })
                  : null}
              </Col>
            </Row>
          </div>
        )}

        <Row className="footer" style={{ marginTop: "50px" }}>
          <div className="detial-divider">
            <Divider />
          </div>
          <div className="detail-goback-btn">
            <Button type="dashed" onClick={this.goBack}>
              <Icon type="left" /> Go back
            </Button>
          </div>
        </Row>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    store: state,
  };
};

export default connect(mapStateToProps)(BlogDetail);
