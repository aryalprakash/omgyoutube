import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import {getVideoData, getChannelVideos, getRelatedVideos} from './actions/video.js'
import Header from './Header.js'
import Loader from './Loader.js'


class Watch extends Component {

    constructor(){
        super()
        this.state = {
            videoData: null,
            title: null,
            url : null,
            uploader : null,
            thumbnail : null,
            download_button : null,
            formats : null,
            format_list : null,
            views : null
        }
    }

    componentWillMount(){
        this.props.dispatch(getRelatedVideos(this.props.routeParams.videoID));
        this.props.dispatch(getVideoData(this.props.routeParams.videoID));
    }

    componentWillUpdate(){
        //this.props.dispatch(getRelatedVideos(this.props.routeParams.videoID));
        //this.props.dispatch(getVideoData(this.props.routeParams.videoID));
    }

    gotoVideo(videoId){
        this.props.dispatch(getRelatedVideos(videoId));
        this.props.dispatch(getVideoData(videoId));
        this.context.router.push(`/watch/v=${videoId}`);
    }

    toggleView = () => {
        this.setState({
            renderSearch: true
        })
    }

    render() {
        console.log(this.props);
        let videoData, title, url, uploader, thumbnail, download_button, formats, format_list, views;
        //if(this.props.vidinfo && this.props.vidinfo.info){
            try {
            let relatedVideos = this.props.relatedVideos.items;
            videoData = this.props.vidinfo;
            url =  videoData.url;
            title  = videoData.info.title;
            uploader  = videoData.info.uploader;
            thumbnail  = videoData.info.thumbnail;
            views  = videoData.info.view_count + ' views';
            download_button =  <a href={videoData.info.url} download ={title+".mp4"}><div className="download-button">Download</div></a>;
            formats =  videoData.info.formats.filter(x=> x.format_id == '18' || x.format_id =='22');
            format_list = formats.map(vid => <span className="dwn_format"><a href={vid.url} download={title+"."+vid.ext}>{vid.format_note}</a></span> )
        //}
            const video = this.props.routeParams.videoID;
            return (<div>
                <Header toggleView={this.toggleView} />
                <div className="transparent">
                    <div className="left">
                        <div className="video-details-controller">
                            <iframe src={'https://www.youtube.com/embed/' + video + '?autoplay=1&rel=0&amp;showinfo=0'} border="none" allowFullScreen></iframe>
                        </div>
                        <div className="video-details white">
                            <div className="video-details-title">{title}</div>
                            <img className="video-channel-thumb" src={thumbnail} />
                            <div className="video-info">
                                <div className="video-channel">{uploader}</div>
                                <div className="download">
                                    {download_button}
                                    {format_list}
                                </div>
                                <span className="views">{views}</span>
                            </div>
                        </div>

                        <div className="video-share white">
                            <div className="share-title">Share</div>
                            <div className="line"></div>
                            <div className="share">
                                <img src="../img/share.png" />
                            </div>
                        </div>

                        <div className="video-comments white">
                    {url}

                        </div>
                    </div>
                    <div className="right white">
                        <div className="sidebar-video-list">
                        Recommended
                            <div className="line"></div>

                            {
                                relatedVideos ? relatedVideos.map(video =>{
                                    return(<div>
                                        <div className="sidebar-video">
                                        <div className="sidebar-video-thumbnail">
                                            <img src={video.snippet.thumbnails.medium.url} width="100%"/>
                                        </div>
                                        <div className="sidebar-video-info">
                                            <div className="video-title">
                                                <a className="title-link" onClick={_=> this.gotoVideo(video.id.videoId)}>{video.snippet.title}</a>
                                            </div>
                                            <div className="video-channel">{video.snippet.channelTitle}</div>
                                        </div>
                                    </div>
                                        <div className="line"></div>
                                    </div>)
                                }): null
                            }
                         <div className="get-more" >Show More</div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }catch(e){
                console.log(e);
            return(<div>
                <Header />
                <Loader />
            </div>)
        }
    }
}

Watch.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = ({ vidinfo, relatedVideos }) => ({
    vidinfo,
    relatedVideos
})

export default connect(mapStateToProps)( Watch )