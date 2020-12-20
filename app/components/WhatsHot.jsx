import { withRouter, Link } from 'react-router-dom';
import React, { Component } from 'react'
require('../assets/styles/WhatsHot.scss')
import axios from 'axios'
import APIS from '../api/index'

class WhatsHot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    handleLink = (item) => {
        console.log(item._id)
        this.props.history.push({
            pathname: '/app/blogall/blogdetail/' + item._id,
        })
    }

    componentDidMount() {
        let url = APIS.getWhatsHot.devUrl
        axios.get(url).then(res => {
            this.setState({ data: res.data })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className='whats-hot-wrapper'>
                <h2 className='hots-title'>What's Hot</h2>
                <ul>
                    {this.state.data.map(item => {
                        return <li>
                            <div href='#' onClick={this.handleLink.bind(this, item)}>
                                <i className='hots-tag'>#</i>
                                <span>{item.title}</span>
                            </div>

                        </li>
                    })}
                </ul>
            </div>
        )
    }
}

export default withRouter(WhatsHot)