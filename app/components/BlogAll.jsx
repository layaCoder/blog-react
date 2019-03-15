/*
2019-03-08 update ： 
【分页】 改为 【下拉懒加载】
参考:https://blog.csdn.net/zhuchuana/article/details/84848815
*/


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Skeleton, Pagination, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import BlogItem from './BlogItem';

import axios from 'axios'
import APIS from '../api/index'
import { initBlogs } from '../store/actions';
require('../assets/styles/BlogAll.css')

class BlogAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogObj: '',
            blogs: [],
            //pageSize: 10,
            pageNum: 1, //懒加载其实页为第2页，第1页也在项目启动加载完成,
            isLoading: false,
            hasMore: true,
            firstLoading: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll); //开启滚动监听
        //加载页面数据
        let url = APIS.blogList.devUrl + '?pageIndex=1&pageSize=10'
        this.setState({ firstLoading: true })

        axios.get(url).then(res => {
            this.props.dispatch(initBlogs(res.data, true))
            if (this.props.store.blogs.length > 0) {
                // setInterval(() => { this.setState({ ProgressPercent: 100 }) }, 1000)
                // todo:将进度条从layout的state转移到store中
            }
            else {
                message.warning('server err!!!')
            }
            this.setState({ firstLoading: false })
        }).catch(err => {
            console.log(err)
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll) //销毁滚动监听
    }



    //滚动条滚动方法，
    handleScroll = (event) => {
        let clientHeight = document.documentElement.clientHeight//可视区域高度
        let scrollTop = document.documentElement.scrollTop;//滚动条滚动高度
        let scrollHeight = document.documentElement.scrollHeight; //滚动内容高度

        let res = scrollHeight - scrollTop - clientHeight;
        if (res <= 400 && !this.state.isLoading) { //值小于400时，开始加载数据
            console.log('scollRes->', res)
            this.setState({ isLoading: true })
            if (this.state.hasMore) {
                this.handleLoadMore()
            }
        }

    }

    handleLoadMore = () => {
        let url = APIS.blogList.devUrl + "?pageIndex=" + (this.state.pageNum + 1) + '&pageSize=10'
        axios.get(url).then(res => {
            if (res.data.length === 0) {
                this.setState({ hasMore: false })
                return
            }
            this.setState({ pageNum: this.state.pageNum + 1 })
            this.props.dispatch(initBlogs(res.data, false))//将请求的数据，push至 store blog数组中
            this.setState({ isLoading: false })
        })
    }


    changeNum = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ pageNum: page })

    }

    changePageSize = (current, size) => {
        //设置pageSize后返回第一页（pageNum:1)，避免选择Size后当前页显示错误
        this.setState({ pageSize: size, pageNum: 1 })
    }

    render() {
        let myStyle = {
            textAlign: 'center'
        }

        // let paginationStyle = {
        //     textAlign: 'center',
        //     marginTop: '20px'
        // }

        return (
            <div ref="bodyBox">
                <div>
                    <Row>
                        <h2 style={myStyle}>All Blogs</h2>
                    </Row>
                    {/* {this.props.store.blogs.length === 0 ? */}
                    {this.state.firstLoading === true ?
                        <div>
                            < Skeleton avatar paragraph={{ rows: 4 }} />
                            < Skeleton avatar paragraph={{ rows: 4 }} />
                            < Skeleton avatar paragraph={{ rows: 4 }} />
                        </div>
                        : null}
                </div>
                <div>
                    {this.state.firstLoading === true ? null :
                        <Row>
                            {
                                this.props.store.blogs.map(item => {
                                    // this.props.store.blogs.slice((this.state.pageNum - 1) * this.state.pageSize, (this.state.pageNum - 1) * this.state.pageSize + this.state.pageSize).map(item => {
                                    return <BlogItem item={item} key={item.id} type="allBlogs" />
                                })}
                        </Row>
                    }

                    <Row>
                        {/* <Pagination style={paginationStyle}
                            defaultCurrent={1}
                            current={this.state.pageNum}
                            pageSize={this.state.pageSize}
                            total={this.props.store.blogs.length}
                            onChange={this.changeNum}
                            onShowSizeChange={this.changePageSize}
                            pageSizeOptions={["5", "10", "15", "20"]}
                            showSizeChanger={true}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        /> */}
                    </Row>
                </div>
                {this.state.hasMore && this.state.isLoading ? <div>&nbsp;Loading...&nbsp;</div> : null}
                {!this.state.hasMore ? <div>&nbsp; No more!!! &nbsp;</div> : null}

            </div>

        )
    }
}

let mapStateToProps = (state) => {
    return {
        store: state
    }
};

export default withRouter(connect(mapStateToProps)(BlogAll));


