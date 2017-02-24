import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import {getVideoData, getChannelVideos} from './actions/video.js'

import Header from './Header.js'
import Loader from './Loader.js'
import App from './App.js'

export default class Home extends Component {

    toggleView = () => {
        this.setState({
            renderSearch: true
        })
    }

    render() {
            return(<div>
                <Header toggleView={this.toggleView} />
                <App />
            </div>)
            }
}

Home.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps)( Home )

