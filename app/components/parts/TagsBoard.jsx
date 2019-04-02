import React, { Component } from 'react'
import { Row, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { initBlogs, isShowLoading, hasMoreBlogItem } from '../../store/actions'
import APIS from '../../api/index'
import axios from 'axios';

require('../../assets/styles/TagsBoard.scss')


class TagsBoard extends Component {
    componentDidMount() {
    }

    linkToFrontend = (param) => {
        this.props.dispatch(hasMoreBlogItem(true))
        this.props.dispatch(isShowLoading(true)) //全局显示loading
        //加载页面数据
        let url = APIS.blogListByTag.devUrl + '?pageIndex=1&pageSize=10&tag=' + param
        axios.get(url).then(res => {
            this.props.dispatch(initBlogs(res.data, true))
            this.props.dispatch(isShowLoading(false))
            if (this.props.store.blogs.length > 0) {
                this.props.history.push({
                    pathname: '/app/blogall/blogfilter/' + param
                })
            }
            else {
                message.warning('server err!!!')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {

        return (
            <div className="tag-board">
                <Row className="tag-board-row">
                    <div className="tag-board-btn" onClick={this.linkToFrontend.bind(this, 'Frontend')}>
                        <span><Icon type="tag" />&nbsp;Frontend</span>
                    </div>
                    <div className="tag-board-btn" onClick={this.linkToFrontend.bind(this, 'Backend')}>
                        <span><Icon type="tag" />&nbsp;Backend</span>
                    </div>
                    <div className="tag-board-btn" onClick={this.linkToFrontend.bind(this, 'CentOS')}>
                        <span><Icon type="tag" />&nbsp;CentOS</span>
                    </div>
                </Row>
                <Row className="tag-board-row">
                    <div className="tag-board-btn" onClick={this.linkToFrontend.bind(this, 'Css')}>
                        <span><Icon type="tag" />&nbsp;CSS</span>
                    </div>
                    <div className="tag-board-btn" onClick={this.linkToFrontend.bind(this, 'JavaScript')}>
                        <span><Icon type="tag" />&nbsp;JavaScript</span>
                    </div>
                    <div className="tag-board-btn" onClick={this.linkToFrontend.bind(this, 'Design')}>
                        <span><Icon type="tag" />&nbsp;Design</span>
                    </div>
                </Row>
                <Row className="tag-board-row">
                    <div className="tag-board-btn" onClick={this.linkToFrontend.bind(this, 'DevTool')}>
                        <span><Icon type="tag" />&nbsp;DevTool</span>
                    </div>
                    <div className="tag-board-btn" onClick={this.linkToFrontend.bind(this, 'LifeStyle')}>
                        <span><Icon type="tag" />&nbsp;LifeStyle</span>
                    </div>

                </Row>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        store: state
    }
};

export default withRouter(connect(mapStateToProps)(TagsBoard))