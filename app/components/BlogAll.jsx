/*
2019-03-08 update ： 
【分页】 改为 【下拉懒加载】
参考:https://blog.csdn.net/zhuchuana/article/details/84848815
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Icon } from "antd";
import { withRouter } from "react-router-dom";
import "antd/dist/antd.css";
import BlogItem from "./BlogItem";

import axios from "axios";
import APIS from "../api/index";
import { initBlogs, hasMoreBlogItem } from "../store/actions";
import { IsPC } from "../utils/commUtils";
require("../assets/styles/BlogAll.css");

function rowRenderer({ key, index, style }) {
  return <div key={key}>test</div>;
}

class BlogAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogObj: "",
      blogs: [],
      //pageSize: 10,
      pageNum: 1, //懒加载其实页为第2页，第1页也在项目启动加载完成,
      isLoading: false,
      //hasMore: true,
      firstLoading: false,
    };
  }

  componentDidMount() {
    if (IsPC()) {
      window.addEventListener("scroll", this.handleScroll, false); //开启滚动监听
    } else {
      window.addEventListener("touchmove", this.handelTouchMove, false); //手机页面使用touch事件
    }
  }

  componentWillUnmount() {
    if (IsPC()) {
      window.removeEventListener("scroll", this.handleScroll, false); //销毁滚动监听
    } else {
      window.removeEventListener("touchmove", this.handelTouchMove, false); //销毁手机页面使用touch事件
    }
  }

  handelTouchMove = (e) => {
    this.handleScroll();
  };

  //滚动条滚动方法，
  handleScroll = (event) => {
    let clientHeight = document.documentElement.clientHeight; //可视区域高度
    // let scrollTop = document.documentElement.scrollTop;//滚动条滚动高度
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop; //top使用兼容性写法，否则移动端浏览器兼听不到scroll事件
    let scrollHeight = document.documentElement.scrollHeight; //滚动内容高度

    let res = scrollHeight - scrollTop - clientHeight;
    if (res <= 400 && !this.state.isLoading) {
      //值小于400时，开始加载数据
      this.setState({ isLoading: true });
      // if (this.state.hasMore) {
      if (this.props.store.hasMoreData) {
        this.handleLoadMore();
      }
    }
  };

  handleLoadMore = () => {
    let url =
      APIS.blogList.devUrl +
      "?pageIndex=" +
      (this.state.pageNum + 1) +
      "&pageSize=10";
    axios.get(url).then((res) => {
      if (res.data.length === 0) {
        // this.setState({ hasMore: false })
        this.props.dispatch(hasMoreBlogItem(false));
        return;
      }
      this.setState({ pageNum: this.state.pageNum + 1 });
      this.props.dispatch(initBlogs(res.data, false)); //将请求的数据，push至 store blog数组中
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { blogs, hasMoreData } = this.props.store;

    return (
      <div ref="bodyBox">
        <div>
          <Row>
            <h2 className="a-title">All Blogs</h2>
          </Row>
        </div>
        <div>
          {this.state.firstLoading || (
            <Row>
              {blogs.map((item) => {
                return <BlogItem item={item} key={item.id} />;
              })}
            </Row>
          )}
        </div>
        {hasMoreData && this.state.isLoading && (
          <div className="loading-bar">
            <Icon type="loading" />
          </div>
        )}
        {hasMoreData || (
          <div className="loading-bar">
            &nbsp; <p>No more!!!</p> &nbsp;
          </div>
        )}
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    store: state,
  };
};

export default withRouter(connect(mapStateToProps)(BlogAll));
