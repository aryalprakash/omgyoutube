import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import {getVideoData, getChannelVideos} from '../actions/video.js'

import Header from './Header.js'
import Loader from './Loader.js'
import App from './App.js'
import PlayMenu from './PlayMenu.js'

export class Home extends Component {

    toggleView = () => {
        this.setState({
            renderSearch: true
        })
    }

    render() {
            return(<div>
                <PlayMenu />
                <App />
            </div>)
            }
}

Home.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps)( Home )

