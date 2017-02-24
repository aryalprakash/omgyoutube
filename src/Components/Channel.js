import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import {getVideoData, getRelatedVideos, searchVideo, getChannelVideos, getAllVideosFromChannel, getMoreVideosForChannel, getMoreVideos} from '../actions/video.js'
import Helmet from "react-helmet";

import Header from './Header.js'
import Home from './Home.js'
import App from './App.js'
import Loader from './Loader.js'

export default class Channel extends Component {

    constructor(){
        super()
        this.state = {
            data: null
        }
    }

    componentWillMount(){
        //channels.map(channelId => this.props.dispatch(getChannelVideos(channelId)))
        let sorttype;
        if(this.props.routeParams.type === 'latest'){
            sorttype = 'date';
        } else if (this.props.routeParams.type === 'popular'){
            sorttype = 'viewcount';
        } else{
            sorttype = 'relevance'
        }
        this.props.dispatch(getAllVideosFromChannel(this.props.routeParams.channel, sorttype));
    }

    componentWillReceiveProps(){
        this.setState({
            data: 'updated'
        });
    }

    gotoVideo(videoId){
        this.props.dispatch(getRelatedVideos(videoId));
        this.props.dispatch(getVideoData(videoId));
        this.context.router.push(`/watch/v=${videoId}`);
    }

    getMoreResults(channel, type, token){
        let sorttype;
        if(type === 'latest'){
            sorttype = 'date';
        } else if (type === 'popular'){
            sorttype = 'viewcount';
        } else{
            sorttype = 'relevance'
        }
        this.props.dispatch(getMoreVideosForChannel(channel, sorttype, token));
    }

    _setChannel(channel){
        //this.setState({query : channel});
    }

    _sortBy(type){
        let sorttype;
        if(type === 'latest'){
            sorttype = 'date';
        } else if (type === 'popular'){
            sorttype = 'viewcount';
        } else{
            sorttype = 'relevance'
        }
        this.props.dispatch(getAllVideosFromChannel(this.props.routeParams.channel, sorttype));
        this.context.router.push(`/channel/${this.props.routeParams.channel}/${type}`);
    }

    timeSince = (date) =>{

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }

    render() {
        try{
            let videos = this.props.searchResults;
            let token = this.props.token;
            let type = this.props.routeParams.type;
            let data = this.state.data;
            if(videos && videos.length >0) {
                return (<div>
                    <Helmet
                        htmlAttributes={{"lang": "en", "amp": undefined}}
                        title={"Videos from "+ videos[0].snippet.channelTitle}
                        defaultTitle="OMG! Download videos from Youtube"
                    />
                <div className="white">
                    <div className="channelHeader">
                        <div className="channel-head-content">
                            <div className="channel-channel">{videos[0].snippet.channelTitle}</div>
                            <div className="channel-menu">
                            {type === 'relevance' ? <div className="sort-button active" onClick={_=> this._sortBy('relevance')}>Relevance</div> : <div className="sort-button" onClick={_=> this._sortBy('relevance')}>Relevance</div> }
                            {type === 'latest' ? <div className="sort-button active" onClick={_=> this._sortBy('latest')}>Latest</div> : <div className="sort-button " onClick={_=> this._sortBy('latest')}>Latest</div> }
                            {type === 'popular' ? <div className="sort-button active" onClick={_=> this._sortBy('popular')}>Popular</div> : <div className="sort-button " onClick={_=> this._sortBy('popular')}>Popular</div> }
                            </div>
                        </div>
                        <div className="line"></div>
                    </div>

                {
                    videos.map(video=> {
                        return (<div>
                            <div className="sidebar-video">
                                <div className="search-list">
                                <div className="sidebar-video-thumbnail search-list-thumbnail">
                                    <img src={video.snippet.thumbnails.medium.url} width="100%"/>
                                </div>
                                <div className="sidebar-video-info search-list-info">
                                    <div className="video-title">
                                        <a className="title-link" onClick={_=>this.gotoVideo(video.id.videoId)}>{video.snippet.title}</a>
                                    </div>
                                    <div className="video-channel">{video.snippet.channelTitle}</div>
                                </div>
                                </div>
                            </div>
                            <div className="line"></div>
                        </div>)
                    })
                    }
                    <div className="paging">
                        <span className="page-number" onClick={_=> this.getMoreResults(this.props.routeParams.channel, this.props.routeParams.type, token)}>Get More Results</span>
                    </div>
                </div>
                </div>);
            } else return(<div>
                <div className="home-content white">
                    <div className="no-results">Oops! No videos found for this Channel</div>

                </div></div>)
        }
        catch(e){
            console.log(e);
            return(<div>
                <Loader />
            </div>)
        }
    }
}

Channel.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = ({state, searchResults, token}) => ({state, searchResults, token})

export default connect(mapStateToProps)( Channel )

