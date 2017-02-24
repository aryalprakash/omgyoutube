import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'

import {searchVideo} from '../actions/video.js'

export default class Header extends Component {

    constructor(){
        super()
        this.state = {
            query: null,
            viewShown: false
        }
    }

    searchVideo(){
        //console.log(this.props.nav);
        this.props.dispatch(searchVideo(this.state.query));
        //this.context.router.push(`/search/${this.state.query}`);
    }



    render(){
        const {toggleView} = this.props
        return(<div className="row head ">
            <div className="twenty">
                <a className="link" href="/">
                    <img src="../../img/logo.png" className="logo" width="100%" />
                    <span className="logo-name">NepTune</span>
                </a>
            </div>
            <div className="search sixty">
                <div className="ninty">
                    <input type="text"
                        className="input-box"
                        placeholder="Search or paste the video link"
                        defaultValue={this.state.query}
                        onChange={ e => {
                            this.state.query = e.target.value.trim();
                            if ( !this.state.viewShown && this.state.query.length > 0)
                             toggleView()
                            this.searchVideo();
                        }}
                    />
                    <button className="search-icon-box" onClick={_=>this.searchVideo()}>
                        <img src="../../img/search.png" className="search-icon"/>
                    </button>
                </div>
            </div>
            <div className="twenty"></div>
        </div>
        )
    }

}


Header.contextTypes = {
    router: React.PropTypes.object
}

export default connect()( Header )