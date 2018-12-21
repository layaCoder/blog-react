import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DatePicker, Row, Col } from 'antd'
import 'antd/dist/antd.css';
import Item from '../../node_modules/antd/lib/list/Item';

class BlogAll extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let testArray=[1,2,3]
        console.log('arraytest',typeof testArray)
        this.props.store.blogs.map((item, index) => { console.log(item, index) })
        //todo 将store的blogList在界面渲染

    }
    componentDidUpdate() {
        console.log('Updated', this.props.store)

    }

    render() {
        let myStyle = {
            textAlign: 'center'
        }
        return (
            <div>
                <Row>
                    <h2>All Blog</h2>
                </Row>
                <Row>

                    {this.props.store.blogs.map((item,index) => { return (<div key={index}>{item.text}</div>) })}
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

export default connect(mapStateToProps)(BlogAll)



