import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Skeleton, Pagination } from 'antd';
import { withRouter } from 'react-router-dom';

import 'antd/dist/antd.css';
import { initBlogs } from '../store/actions';
import BlogItem from './BlogItem';
require('../assets/styles/BlogAll.css')

class BlogAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogObj: '',
            blogs: [],
            pageSize: 10,
            pageNum: 1,
            totleCount: 100
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    // showBlogDetail = (item) => {
    //     //【对话框显示 blogDetail】
    //     console.log('blogObj', item)
    //     this.setState({
    //         blogObj: item
    //     })
    //     this.setState({
    //         visible: true
    //     })
    //     //【跳转页面显示blogDetail】

    //     const thisComp = this//将Layout组件通过thisComp变量绑定，在confirm中使用
    //     thisComp.props.history.push('/app/blogdetail')
    // }

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

        let paginationStyle = {
            textAlign: 'center',
            marginTop: '20px'
        }

        return (
            <div>
                <div>
                    <Row>
                        <h2 style={myStyle}>All Blogs</h2>
                    </Row>
                    {this.props.store.blogs.length === 0 ?
                        <div>
                            < Skeleton avatar paragraph={{ rows: 4 }} />
                            < Skeleton avatar paragraph={{ rows: 4 }} />
                            < Skeleton avatar paragraph={{ rows: 4 }} />
                        </div>
                        : null}
                </div>
                <div>

                    <Row>
                        {
                            // this.props.store.blogs.map(item => {
                            this.props.store.blogs.slice((this.state.pageNum - 1) * this.state.pageSize, (this.state.pageNum - 1) * this.state.pageSize + this.state.pageSize).map(item => {
                                return <BlogItem item={item} key={item.id} type="allBlogs" />
                            })}
                    </Row>
                    <Row>
                        <Pagination style={paginationStyle}
                            defaultCurrent={1}
                            current={this.state.pageNum}
                            pageSize={this.state.pageSize}
                            total={this.props.store.blogs.length}
                            onChange={this.changeNum}
                            onShowSizeChange={this.changePageSize}
                            pageSizeOptions={["5", "10", "15", "20"]}
                            showSizeChanger={true}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        />
                    </Row>
                </div>

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

export default withRouter(connect(mapStateToProps)(BlogAll));


