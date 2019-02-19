import React, { Component } from 'react'
import { Button, Row, Col, Icon, Divider } from 'antd';
import moment from 'moment';

export default class BlogDetail extends Component {
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
            type: '' //记录入口类别， myBlog? allBlog? or others
        }
    }

    componentDidMount() {
        // this.setState({
        //     blogItem: this.props.location.state
        // })
        console.log(this.props.location.state.type)
        if (this.props.location.state) {
            this.setState({
                id: this.props.location.state.id,
                title: this.props.location.state.title,
                htmlDom: this.props.location.state.htmlDom,
                user: this.props.location.state.user,
                date: this.props.location.state.date,
                type: this.props.location.state.type
            })
        }
    }

    goBack = () => {
        // console.log(this.props.history)
        // this.props.history.goBack()
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


        return (
            <div>
                <Row>
                    <Divider> <h2 style={myStyle}>{this.state.title}</h2></Divider>
                </Row>
                <Row>
                    <Col span={5} offset={8}><p>Author:&nbsp;{this.state.user}</p></Col>
                    <Col span={8}><p>Date:&nbsp;{moment(this.state.date).format('LLLL')}</p></Col>
                    <Divider dashed />
                </Row>
                <Row>
                    <Col span={20} offset={2}>
                        <div dangerouslySetInnerHTML={{ __html: this.state.htmlDom }}></div>
                    </Col>
                </Row>
                <Row className="footer" style={{ marginTop: '50px' }}>
                    <Divider />
                    <Button type="dashed" onClick={this.goBack}><Icon type="left" /> Go back</Button>
                </Row>
            </div>

        )
    }
}