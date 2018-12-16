import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../store/actions'

class page1 extends Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        console.log('did update', this.props)
    }
    render() {

        let myStyle = {
            textAlign: 'center'
        }
        return (
            <div>
                <div>this is page 1</div>
                <button onClick={e => { this.props.dispatch(addBlog('hi hi laya')); console.log(this.props) }}>add-blog</button>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    let blogs = state;
    return blogs;
};

export default connect(mapStateToProps)(page1)

