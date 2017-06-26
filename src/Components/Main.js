import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import {getVideoData, getChannelVideos} from '../actions/video.js'

import Header from './Header.js'
import Loader from './Loader.js'
import App from './App.js'

export class Main extends Component {

    render() {
        return(<div>
            <Header props={this.props} />
            {this.props.children}
        </div>)
    }
}

Main.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps)( Main )