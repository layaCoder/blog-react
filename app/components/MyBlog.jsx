import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Skeleton, Pagination, message } from 'antd';
import * as storage from '../utils/commUtils'
import axios from 'axios';
import APIS from '../api/index';
import { delBlog, initBlogs } from '../store/actions'
import BlogItem from './BlogItem'





class MyBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            blogObj: '',
            blogs: [],
            userName: '',
            pageSize: 10,
            pageNum: 1,
            delCurrentId: null,
            isLoading: false,
            hasMore: true,
            firstLoading: false

        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll); //开启滚动监听
        this.setState({ firstLoading: true })
        //获取当前登录的用户，以 name 作为 blogList的 filter条件
        let user = JSON.parse(storage.getLocalStorage("user", 1000 * 60 * 60 * 24))
        this.setState({ userName: user.name })

        let url = APIS.blogList.devUrl + '?pageIndex=1&pageSize=10&user=' + user.name
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

        })
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll) //销毁滚动监听
    }

    // changeNum = (page, pageSize) => {
    //     console.log(page, pageSize)
    //     this.setState({ pageNum: page })
    // }

    // changePageSize = (current, size) => {
    //     //设置pageSize后返回第一页（pageNum:1)，避免选择Size后当前页显示错误
    //     this.setState({ pageSize: size, pageNum: 1 })
    // }

    //删除btn点击事件，将id绑定到state
    handleDel = (id) => {
        console.log('itemId:', id)
        this.setState({ delCurrentId: id })
    }

    //确认删除 ==> 将id post 到 backend
    confirmDel = () => {
        let delUrl = APIS.deleteBlog.devUrl
        axios({
            method: 'post',
            url: delUrl,
            headers: {
                // 'Content-type': 'application/x-www-form-urlencoded'
                'Content-type': 'application/json'
            },
            data: {
                blogId: this.state.delCurrentId
            }
        }).then(res => {
            console.log('server res==>', res)
            this.props.dispatch(delBlog(this.state.delCurrentId))
        }).catch(error => {
            console.log(error)
        })
    }
    cancelDel = () => {
        message.error('Cancel delete');
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
        let url = APIS.blogList.devUrl + "?pageIndex=" + (this.state.pageNum + 1) + '&pageSize=10&user=' + this.state.userName
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



    render() {
        let myStyle = {
            textAlign: 'center'
        }
        let paginationStyle = {
            textAlign: 'center',
            marginTop: '20px'
        }
        return (
            <div>
                <div>
                    <h2 style={myStyle}>My Blogs</h2>
                </div>
                <div>
                    <div>
                        {this.state.firstLoading === true ?
                            <div>
                                < Skeleton avatar paragraph={{ rows: 4 }} />
                                < Skeleton avatar paragraph={{ rows: 4 }} />
                                < Skeleton avatar paragraph={{ rows: 4 }} />
                            </div>
                            : null}
                    </div>
                    {/* {this.props.store.blogs.length > 0 ? */}
                    {this.state.firstLoading === false ?
                        <div>
                            <Row>
                                {
                                    //用username过滤store中的blogs
                                    // this.props.store.blogs.filter(item => item.user === this.state.userName).slice((this.state.pageNum - 1) * this.state.pageSize, (this.state.pageNum - 1) * this.state.pageSize + this.state.pageSize).map(item => {
                                    this.props.store.blogs.map(item => {
                                        return <BlogItem item={item} key={item.id} type={'myBlogs'} />
                                    })}

                            </Row>

                        </div>
                        : null}
                </div>
                {this.state.hasMore && this.state.isLoading ? <div>&nbsp;Loading...&nbsp;</div> : null}
                {!this.state.hasMore ? <div>&nbsp; No more!!! &nbsp;</div> : null}
            </div>

        )
    }
}

let mapStateToProps = (state) => {
    console.log('store=>>>>', state)
    return {
        store: state
    }
};

export default connect(mapStateToProps)(MyBlog)