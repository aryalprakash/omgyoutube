import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import {getVideoData, getRelatedVideos, searchVideo, getAllPlaylistVideos, getMoreVideos} from '../actions/video.js'
import Helmet from "react-helmet";
import {SERVER_URL} from'../constants/ActionTypes.js'


import Loader from './Loader.js'
import PlayMenu from './PlayMenu.js'
import {Collections} from '../constants/ActionTypes.js'

export default class Collection extends Component {

    constructor(){
        super()
        this.state = {
            data: null
        }
    }

    componentWillMount(){
        let collection = this.props.routeParams.collection;
        let playlist = this.props.routeParams.playlist;
        let playlist_id = Collections[collection].find(x=> x.slug === playlist).id;
        this.props.dispatch(getAllPlaylistVideos(playlist_id, 30));
        this._keeplog(this.props.routeParams.collection+" : "+this.props.routeParams.playlist);
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

    gotoCollection(collection, slug){
        let playlist_id = Collections[collection].find(x=> x.slug === slug).id;
        this.props.dispatch(getAllPlaylistVideos(playlist_id, 30));
        this.context.router.push(`/collection/${collection}/${slug}`);
        this._keeplog(collection+":"+slug)
    }


    _keeplog(value){
        //var data = new FormData();
        //data.append("page", "index");
        //data.append("page", value);
        //fetch(SERVER_URL+"/visitlog.php",
        //    {
        //        method: "POST",
        //        body: data
        //    })
        //    .then(function(res){ return res.json(); });
    }


    renderVideos(videos){
        return (<div>
        {videos.map(video=> video.snippet.thumbnails?
            (<div><div className="sidebar-video">
                    <div className="search-list">
                        <div className="sidebar-video-thumbnail search-list-thumbnail">
                            <Link to={`/watch/v=${video.snippet.resourceId.videoId}`}><img src={video.snippet.thumbnails ? video.snippet.thumbnails.medium.url : '../img/logo.png'} width="100%"/></Link>
                        </div>
                        <div className="sidebar-video-info search-list-info">
                            <div className="video-title">
                                <Link to={`/watch/v=${video.snippet.resourceId.videoId}`} className="title-link">{video.snippet.title}</Link>
                            </div>
                            <div className="video-channel">{video.snippet.channelTitle}</div>
                        </div>
                    </div>
                </div>
                <div className="line"></div>
            </div>): ''
        , this)}
            </div>
    )}

    noResults(){
        return(<div>
            <div className="sidebar-video">
                <div className="no-results">Oops! No videos found here.</div>
            </div></div>)
    }

    loading(){
        return(<div>
            <Loader />
        </div>)
    }

    render() {
        try{
            let videos = this.props.searchResults;
            let token = this.props.token;
            let slug = this.props.routeParams.playlist;
            let type = "relevance";
            let data = this.state.data;
            let collection = this.props.routeParams.collection;
            let collection_menu = Collections[collection];
            let title = "Download "+slug+" "+collection+ " from Youtube";
            let description = "Watch and download collection of latest and popular "+slug+" "+collection+ " from Youtube";
            let thumbnail = "http://omgyoutube.com/img/download%20youtube%20videos.png";
            let keywords = "omg youtube, youtube downloader, easiset youtube downloader, youtube to mp4, youtube to mp3, hd movie torrents, download videos";

            return (<div>
                    <Helmet
                        htmlAttributes={{"lang": "en", "amp": undefined}}
                        title={"Download "+slug+" "+collection+ " from Youtube"}
                        defaultTitle="OMG! Download videos from Youtube"
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
                    <div className="playlist white">
                        <div className="playlistHeader">
                            <PlayMenu path={this.props.routeParams.collection} />
                            <div className="header-line"></div>
                        </div>
                        <div className="channelHeader">
                            <div className="channel-head-content">
                                <div className="channel-channel">{collection}</div>
                                <div className="channel-menu">
                                {collection_menu.map(col=>col.slug === slug ? <div className="sort-button active" onClick={_=>this.gotoCollection(collection,col.slug)}>{col.name}</div> : <div className="sort-button" onClick={_=>this.gotoCollection(collection,col.slug)}>{col.name}</div>)}
                                </div>
                            </div>
                            <div className="line"></div>
                        </div>
                             {videos ? videos.length >0 ? this.renderVideos(videos) : this.noResults() : this.loading()}
                    </div>
                </div>);

        }
        catch(e){
            console.log(e);
            return(<div>
                <Loader />
            </div>)
        }
    }
}

Collection.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = ({state, searchResults, token}) => ({state, searchResults, token})

export default connect(mapStateToProps)( Collection )

