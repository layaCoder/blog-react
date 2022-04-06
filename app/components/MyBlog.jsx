import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Skeleton, Pagination, message, Icon } from "antd";
import * as storage from "../utils/commUtils";
import axios from "axios";
import APIS from "../api/index";
import {
  delBlog,
  initBlogs,
  hasMoreBlogItem,
  userLogout,
} from "../store/actions";
import BlogItem from "./BlogItem";
import { IsPC } from "../utils/commUtils";

class MyBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      blogObj: "",
      blogs: [],
      userName: "",
      pageSize: 10,
      pageNum: 1,
      delCurrentId: null,
      isLoading: false,
      // hasMore: true,
      firstLoading: false,
    };
  }

  componentDidMount() {
    if (IsPC()) {
      window.addEventListener("scroll", this.handleScroll, false); //开启滚动监听
    } else {
      window.addEventListener("touchmove", this.handelTouchMove, false); //手机页面使用touch事件
    }
    //this.setState({ firstLoading: true })
    //获取当前登录的用户，以 name 作为 blogList的 filter条件
    let user = JSON.parse(storage.getLocalStorage("user", 1000 * 60 * 60 * 24));
    if (user) {
      this.setState({ userName: user.name });
    } else {
      this.props.history.push({
        pathname: "/app/blogall",
      });
      window.location.reload();
      this.props.dispatch(userLogout(false));
    }
  }

  componentWillUnmount() {
    if (IsPC()) {
      window.removeEventListener("scroll", this.handleScroll, false); //销毁滚动监听
    } else {
      window.removeEventListener("touchmove", this.handelTouchMove, false); //销毁手机页面使用touch事件
    }
  }

  //删除btn点击事件，将id绑定到state
  handleDel = (id) => {
    console.log("itemId:", id);
    this.setState({ delCurrentId: id });
  };

  confirmDel = () => {
    let delUrl = APIS.deleteBlog.devUrl;
    axios({
      method: "post",
      url: delUrl,
      headers: {
        // 'Content-type': 'application/x-www-form-urlencoded'
        "Content-type": "application/json",
      },
      data: {
        blogId: this.state.delCurrentId,
      },
    })
      .then((res) => {
        console.log("server res==>", res);
        this.props.dispatch(delBlog(this.state.delCurrentId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  cancelDel = () => {
    message.error("Cancel delete");
  };

  handelTouchMove = (e) => {
    this.handleScroll();
  };

  //滚动条滚动方法，
  handleScroll = (event) => {
    let clientHeight = document.documentElement.clientHeight; //可视区域高度
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop; //top使用兼容性写法，否则移动端浏览器兼听不到scroll事件
    let scrollHeight = document.documentElement.scrollHeight; //滚动内容高度

    let res = scrollHeight - scrollTop - clientHeight;
    if (res <= 400 && !this.state.isLoading) {
      //值小于400时，开始加载数据
      console.log("scollRes->", res);
      this.setState({ isLoading: true });
      // if (this..hasMore) {
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
      "&pageSize=10&user=" +
      this.state.userName;
    axios.get(url).then((res) => {
      if (res.data.length === 0) {
        console.log("res", res.data);
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
    return (
      <div>
        <div>
          <h2 className="a-title">My Blogs</h2>
        </div>
        <div>
          <div>
            {this.state.firstLoading === true ? (
              <div>
                <Skeleton avatar paragraph={{ rows: 4 }} />
                <Skeleton avatar paragraph={{ rows: 4 }} />
                <Skeleton avatar paragraph={{ rows: 4 }} />
              </div>
            ) : null}
          </div>
          {/* {this.props.store.blogs.length > 0 ? */}
          {this.state.firstLoading === false ? (
            <div>
              <Row>
                {
                  //用username过滤store中的blogs
                  // this.props.store.blogs.filter(item => item.user === this.state.userName).slice((this.state.pageNum - 1) * this.state.pageSize, (this.state.pageNum - 1) * this.state.pageSize + this.state.pageSize).map(item => {
                  this.props.store.blogs.map((item) => {
                    return <BlogItem item={item} key={item.id} />;
                  })
                }
              </Row>
            </div>
          ) : null}
        </div>
        {this.props.store.hasMoreData && this.state.isLoading ? (
          <div className="loading-bar">
            {" "}
            <Icon type="loading" />
          </div>
        ) : null}
        {!this.props.store.hasMoreData ? (
          <div className="loading-bar">
            &nbsp; <p>No more!!!</p> &nbsp;
          </div>
        ) : null}
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  console.log("store=>>>>", state);
  return {
    store: state,
  };
};

export default connect(mapStateToProps)(MyBlog);
