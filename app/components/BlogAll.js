import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DatePicker, Row, Col } from 'antd'
import 'antd/dist/antd.css';


class BlogAll extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    componentDidUpdate() {
        console.log('Updated', this.props.store)
    }

    render() {

        return (
            <div>
                <Row>
                    <h2>All Blog</h2>
                </Row>
                <Row>
                    {this.props.store.blogs.map((item) => { return (<div key={item.id} dangerouslySetInnerHTML={{ __html: item.text }}></div>) })}
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



