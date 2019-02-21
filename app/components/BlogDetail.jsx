import React, { Component } from 'react'
import { Button, Row, Col, Icon, Divider } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux'



class BlogDetail extends Component {
    constructor() {
        super();
        this.state = {
            blogId: '',
            // blogItem: {
            //     title: '1',
            //     htmlDom: '2',
            //     user: '4',
            //     id: 5
            // },
            id: '',
            title: '',
            htmlDom: '',
            user: '',
            type: null //记录入口类别， myBlog? allBlog? or others
        }
    }

    componentDidMount() {
        //通过入口返回，如果强制f5刷新页面，type=null ,返回 blogAll
        if (this.props.location.state) {
            this.setState({ type: this.props.location.state.type })
        }
    }

    goBack = () => {
        //this.props.history.goBack()
        if (this.state.type === 'myBlogs')
            this.props.history.push('/app/myblog') //js方式控制也秒跳转

        else {
            this.props.history.push('/app/blogall')
        }
    }

    render() {
        let myStyle = {
            textAlign: 'center'
        }

        const blogDetailItem = this.props.store.blogs.filter(item => item.id === this.props.match.params.id)


        return (
            <div>
                {blogDetailItem.length > 0 ? //判断store中blogList是否加载完毕
                    <div>
                        <Row>
                            <Divider> <h2 style={myStyle}>{blogDetailItem[0].title}</h2></Divider>
                        </Row>
                        <Row>
                            <Col span={5} offset={8}><p>Author:&nbsp;{blogDetailItem[0].user}</p></Col>
                            <Col span={8}><p>Date:&nbsp;{moment(this.state.date).format('LLLL')}</p></Col>
                            <Divider dashed />
                        </Row>
                        <Row>
                            <Col span={20} offset={2}>
                                <div dangerouslySetInnerHTML={{ __html: blogDetailItem[0].htmlDom }}></div>
                            </Col>
                        </Row>
                        <Row className="footer" style={{ marginTop: '50px' }}>
                            <Divider />
                            <Button type="dashed" onClick={this.goBack}><Icon type="left" /> Go back</Button>
                        </Row>
                    </div>
                    : null}
            </div>

        )
    }
}

let mapStateToProps = (state) => {
    return {
        store: state
    }
};

export default connect(mapStateToProps)(BlogDetail);