import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import {getAllPlaylistVideos, getMoreVideos, getRelatedVideos, getVideoData, getMoreVideosForPlaylist} from '../actions/video.js'
import Helmet from "react-helmet";
import {SERVER_URL} from'../constants/ActionTypes.js'


import PlayMenu from './PlayMenu.js'
import Loader from './Loader.js'

import {PLAYLISTS} from '../constants/ActionTypes.js'

export default class Playlist extends Component {

    constructor() {
        super()
        this.state = {
            data: null
        }
    }

    componentWillMount() {
        let playlist_id = PLAYLISTS.find(x=> x.name === this.props.routeParams.playlist).id;
        this.props.dispatch(getAllPlaylistVideos(playlist_id));
        this._keeplog(this.props.routeParams.playlist);
    }

    componentWillReceiveProps() {
        this.setState({
            data: 'updated'
        });
    }


    gotoVideo(videoId) {
        this.props.dispatch(getRelatedVideos(videoId));
        this.props.dispatch(getVideoData(videoId));
        this.context.router.push(`/watch/v=${videoId}`);
    }

    getMoreResults(playlist, token) {
        this.props.dispatch(getMoreVideosForPlaylist(playlist, token));
    }


    _keeplog(value){
        //var data = new FormData();
        //data.append("page", value);
        //fetch(SERVER_URL+"/visitlog.php",
        //    {
        //        method: "POST",
        //        body: data
        //    })
        //    .then(function(res){ return res.json(); });
    }



    render() {
        try {
            let videos = this.props.searchResults;
            let token = this.props.token;
            let type = this.props.routeParams.type;
            let data = this.state.data;

            let title = "Download "+this.props.routeParams.playlist+" videos from Youtube";
            let description = "Watch and download collection of latest and popular "+this.props.routeParams.playlist+ " videos from Youtube";
            let thumbnail = "http://omgyoutube.com/img/download%20youtube%20videos.png";
            let keywords = "omg youtube, youtube downloader, easiset youtube downloader, youtube to mp4, youtube to mp3, hd movie torrents, download videos";


            return (<div>
                <Helmet
                    htmlAttributes={{"lang": "en", "amp": undefined}}
                    title={"Download " + this.props.routeParams.playlist + " videos in Youtube"}
                    defaultTitle="OMG Youtube! Download videos from Youtube"
                    meta={[
                        {"name": "description", "content": description},
                        {"name": "keywords", "content": keywords},
                        {"name":"thumbnail", "content": thumbnail},
                        {"property": "og:site_name", "content": "OMG Youtube"},
                        {"property": "og:image", "content": thumbnail},
                        {"property": "twitter:card", "content": "summary_large_image"},
                        {"property": "twitter:site", "content": "@omgyoutube"},
                        {"property": "twitter:title", "content": title},
                        {"property": "twitter:text:description", "content":description},
                        {"property":"twitter:image", "content": thumbnail}
                    ]}
                />
                <div className=" playlist white">
                    <div className="playlistHeader">
                        <PlayMenu path={this.props.routeParams.playlist} />
                        <div className="header-line"></div>
                    </div>

                {videos.length > 0 ?
                    videos.map(video=> video.snippet.thumbnails?
                        (<div className="playlist-results" key={video.snippet.resourceId.videoId}>
                            <div className="sidebar-video">
                                <div className="search-list">
                                    <div className="sidebar-video-thumbnail search-list-thumbnail">
                                        <img src={video.snippet.thumbnails ? video.snippet.thumbnails.medium.url : '../img/logo.png'} width="100%"/>
                                    </div>
                                    <div className="sidebar-video-info search-list-info">
                                        <div className="video-title">
                                            <a className="title-link" onClick={_=>this.gotoVideo(video.snippet.resourceId.videoId)}>{video.snippet.title}</a>
                                        </div>
                                        <div className="video-channel">{video.snippet.channelTitle}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="line"></div>
                        </div>): '')
                    : <div>
                    <div className="no-results">Oops! No videos found. Please try again later.</div>
                </div>
                    }
                    {token ? <div className="paging">
                        <span className="page-number" onClick={_=> this.getMoreResults(videos[0].snippet.playlistId, token)}>Get More Results</span>
                    </div>: null}

                </div>
            </div>)
        } catch (e) {
            console.log(e);
            return (<div>
                <div className="playlist white">
                    <div className="playlistHeader">
                        <PlayMenu path={this.props.routeParams.playlist} />
                        <div className="header-line"></div>
                    </div>
                    <Loader />
                </div>
            </div>)
        }
    }
}


Playlist.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = ({state, searchResults, token}) => ({state, searchResults, token})

export default connect(mapStateToProps)( Playlist )

