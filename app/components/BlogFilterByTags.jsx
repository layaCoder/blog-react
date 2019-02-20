import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Comment, Icon, Tooltip, Avatar, Modal, Button, DatePicker, Row, Col, Skeleton, Pagination } from 'antd';
import { withRouter } from 'react-router-dom';
import { Route, Link, Switch } from 'react-router-dom';
import moment from 'moment';

import 'antd/dist/antd.css';
import { setLocalStorage, getLocalStorage } from '../utils/commUtils'
import { initBlogs } from '../store/actions';
import BlogItem from './BlogItem';
require('../assets/styles/BlogAll.css')

class BlogFilterByTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogObj: '',
            blogs: [],
            pageSize: 10,
            pageNum: 1,
            blogType: null

        }
    }

    componentDidMount() {
        this.setState({ blogType: this.props.location.tag })
    }

    componentDidUpdate() {

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

        let paginationStyle = {
            textAlign: 'center',
            marginTop: '20px'
        }

        return (
            <div>
                <div>
                    {this.props.store.blogs.length === 0 ?
                        < Skeleton avatar paragraph={{ rows: 4 }} />
                        : null}
                </div>
                {this.props.store.blogs.length > 0 ?
                    <div>
                        <Row>
                            <h2 style={myStyle}>{this.props.location.tag}</h2>
                            {/* <h2 style={myStyle}>{this.state.blogType}</h2> */}

                        </Row>
                        <Row>
                            {
                                //在store中filter出tag匹配的blogItem
                                this.props.store.blogs.filter(item => item.tags.includes(this.props.location.tag)).slice((this.state.pageNum - 1) * this.state.pageSize, (this.state.pageNum - 1) * this.state.pageSize + this.state.pageSize).map(item => {
                                    // if (item.tags.includes(this.props.location.tag))
                                    return <BlogItem item={item} key={item.id} type="allBlogs" />
                                })}
                        </Row>
                        <Row>
                            <Pagination style={paginationStyle}
                                defaultCurrent={1}
                                current={this.state.pageNum}
                                pageSize={this.state.pageSize}
                                total={this.props.store.blogs.filter(item => item.tags.includes(this.props.location.tag)).length} //总长度影响分页页数，必须filter出最后数值
                                onChange={this.changeNum}
                                onShowSizeChange={this.changePageSize}
                                pageSizeOptions={["5", "10", "15", "20"]}
                                showSizeChanger
                                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                            />
                        </Row>
                    </div>
                    : null}

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

export default withRouter(connect(mapStateToProps)(BlogFilterByTags));




