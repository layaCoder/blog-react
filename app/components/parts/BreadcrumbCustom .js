import React, { Component } from 'react';
import { Breadcrumb, Switch, Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
//具体导航的名称
const breadcrumbNameMap = {
    '/app': 'Home',
    '/app/myblog': 'My Blog',
    '/app/writeblog': 'Write Blog',
    '/app/blogall': 'Blog All',
    '/app/blogall/blogdetail': 'Blog Detail'
};
class BreadcrumbCustom extends Component {
    //利用PropTypes记住所跳转每个页面的位置 
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            pathSnippets: null,
            extraBreadcrumbItems: null
        }
    }
    getPath() {
        //对路径进行切分，存放到this.state.pathSnippets中
        this.state.pathSnippets = this.context.router.history.location.pathname.split('/').filter(i => i);
        //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
        this.state.extraBreadcrumbItems = this.state.pathSnippets.map((_, index) => {
            const url = `/${this.state.pathSnippets.slice(0, index + 1).join('/')}`;
            // console.log('url')
            // console.log(url)
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
    }

    componentWillMount() {
        //首次加载的时候调用，形成面包屑
        this.getPath();
    }
    componentWillReceiveProps() {
        //任何子页面发生改变，均可调用，完成路径切分以及形成面包屑
        this.getPath();
    }
    render() {
        return (

            <span>
                <Breadcrumb style={{ margin: '12px 0' }}>

                    {this.state.extraBreadcrumbItems}
                </Breadcrumb>
            </span>
        )
    }
}
export default BreadcrumbCustom;
