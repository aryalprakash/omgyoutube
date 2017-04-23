import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import Helmet from "react-helmet";


import {SERVER_URL} from'../constants/ActionTypes.js'
import {getVideoData, getChannelVideos, flushCurrentData, getRelatedVideos} from '../actions/video.js'
import Header from './Header.js'
import Loader from './Loader.js'


class Watch extends Component {

    constructor(){
        super()
        this.state = {
            videoData: null,
            title: null,
            url : null,
            omgurl: null,
            uploader : null,
            thumbnail : null,
            download_button : null,
            formats : null,
            format_list : null,
            views : null
        }
    }



    componentWillMount(){
            if(!this.props.vidinfo)
                this.props.dispatch(getRelatedVideos(this.props.routeParams.videoID));

            if(!this.props.relatedVideos)
            this.props.dispatch(getVideoData(this.props.routeParams.videoID));
    }

    componentWillReceiveProps(){
        this.setState({omgurl: `${SERVER_URL}/#/watch/v=${this.props.routeParams.videoID}`})
    }

    componentDidMount(){
    window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll(){
        var node = this.refs.left;
        if(node){
        let scrollHeight = node.getBoundingClientRect();
        if(scrollHeight.top <= 0 && window.innerWidth<600){
            this.refs.videoFrame.style.position = "fixed";
            this.refs.videoFrame.style.zIndex = "1111";
            this.refs.videoFrame.style.top = "0";
        } else{
            this.refs.videoFrame.style.position = "relative";
            this.refs.videoFrame.style.zIndex = "1111";
            this.refs.videoFrame.style.top = "0";
        }
        }
    }

    componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    componentDidUpdate() {
        FB.XFBML.parse();
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

    render() {
        let relatedVideos, videoData, title, tweetTitle, url, omgurl, uploader, uploader_id, thumbnail, description, download_button, formats, format_list, mp3, views, keywords;
        if(this.props.relatedVideos){
            relatedVideos = this.props.relatedVideos.items;
        }
        this.state.omgurl = `http://omgyoutube.com/watch/v=${this.props.routeParams.videoID}`;
        let ogurl = 'https://https://www.youtube.com/embed/'+this.props.routeParams.videoID;
        let Iframe="iframe";
        if(this.props.vidinfo && this.props.vidinfo.info){
            //try {
            videoData = this.props.vidinfo;
            url =  videoData.url;
            title  = videoData.info.title;
            tweetTitle = title.substring(0,85);
            uploader  = videoData.info.uploader;
            uploader_id  = videoData.info.uploader_id;
            thumbnail  = videoData.info.thumbnail;
            description  = videoData.info.description;
            keywords = videoData.info.tags.join(",");
            views  = videoData.info.view_count + ' views';
            download_button =  <a href={videoData.info.url+'&title=OMGYoutube.com - '+title+'.mp4'} download ={title+".mp4"}><div className="download-button download-main">Download MP4</div></a>;
            formats =  videoData.info.formats.filter(x=> x.format_id == '22' || x.format_id == '18' || x.format_id == '5');
            format_list = formats.map(vid => <a href={vid.url+'&title=OMGYoutube.com - '+title+'.'+vid.ext} className="down_box" key={vid.format_id} download={title+"."+vid.ext}><div className="dwn_format" >{vid.format_note === 'DASH video' ? vid.height+'p': vid.height+'p' }<span className="file-size"></span></div></a> )
            }
            const video = this.props.routeParams.videoID;
            return (<div>
                <Helmet
                    htmlAttributes={{"lang": "en", "amp": undefined}}
                    title={title ? "Download "+ title : "OMG Youtube - Download videos from Youtube"}
                    defaultTitle="OMG Youtube! Download videos from Youtube"
                    meta={[
                        {"name": "description", "content": description},
                        {"name": "keywords", "content": keywords},
                        {"name":"thumbnail", "content": thumbnail},
                        {"property": "og:site_name", "content": "OMG Youtube"},
                        {"property": "og:video", "content": ogurl},
                        {"property": "og:video:url", "content": ogurl},
                        {"property": "og:video:secure_url", "content": ogurl},
                        {"property": "og:video:type", "content": "application/x-shockwave-flash"},
                        {"property": "og:video:width", "content": "1280"},
                        {"property": "og:video:height", "content": "720"},
                        {"property": "og:title", "content": "Download "+ title},
                        {"property": "og:image", "content": thumbnail},
                        {"property": "og:type", "content": video},
                        {"property": "twitter:card", "content": "summary_large_image"},
                        {"property": "twitter:site", "content": "@omgyoutube"},
                        {"property": "twitter:title", "content":"Download "+title},
                        {"property": "twitter:description", "content":description},
                        {"property":"twitter:image", "content": thumbnail}
                    ]}
                />
                <div className="transparent">
                    <div className="left" ref="left">
                        <div className="video">
                            <div className="video-container" ref="videoFrame">
                                <iframe className="video" src={'https://www.youtube.com/embed/' + video + '?autoplay=1&rel=0&amp;showinfo=0'} border="none" allowFullScreen></iframe>
                            </div>
                        </div>

                        {videoData ? <div>
                            <div className="video-details white">
                                <div className="video-details-content">
                                <div className="video-details-title">{title}</div>
                                <div className="video-info">
                                    <div>
                                        <Link to={`/channel/${uploader_id}/relevance`}><div className="video-channel halfleftko">{uploader}</div></Link>
                                        <div className="halfrightko"><span className="views">{views}</span></div>
                                    </div>
                                    <div className="download">
                                        {download_button}
                                        {format_list}
                                        <iFrame className="dwn_mp3" src={"https://ycapi.org/button/?v="+this.props.routeParams.videoID+"&c=1&f=MP3"} scrolling="no" width="175px" />
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            <div className="video-share white">
                                <ul className="share-buttons">
                                    <li><a href={"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.href)} title="Share on Facebook" target="_blank" onclick="window.open({'https://www.facebook.com/sharer/sharer.php?u=' + this.state.omgurl}); return false;"><img src="../img/social_flat_rounded_rects_svg/Facebook.svg" /></a></li>
                                    <li><a href={"https://twitter.com/intent/tweet?text="+encodeURIComponent(tweetTitle)+"%20"+encodeURIComponent(window.location.href)+"&via=OMGYoutubeApp"} target="_blank" title="Tweet"><img src="../img/social_flat_rounded_rects_svg/Twitter.svg" /></a></li>
                                    <li><a href={"https://plus.google.com/share?url="+encodeURIComponent(window.location.href)} target="_blank" title="Share on Google+" onclick="window.open('https://plus.google.com/share?url=' + encodeURIComponent(document.URL)); return false;"><img src="../img/social_flat_rounded_rects_svg/Google+.svg" /></a></li>
                                    <li><a href={"http://pinterest.com/pin/create/button/?url="+encodeURIComponent(window.location.href)} target="_blank" title="Pin it" onclick="window.open('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(document.URL) + '&description=' +  encodeURIComponent(document.title)); return false;"><img src="../img/social_flat_rounded_rects_svg/Pinterest.svg" /></a></li>
                                    <li><a href={"https://getpocket.com/save?url="+encodeURIComponent(window.location.href)} target="_blank" title="Add to Pocket" onclick="window.open('https://getpocket.com/save?url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title)); return false;"><img src="../img/social_flat_rounded_rects_svg/Pocket.svg" /></a></li>
                                    <li><a href={"http://www.reddit.com/submit?url="+encodeURIComponent(window.location.href)} target="_blank" title="Submit to Reddit" onclick="window.open('http://www.reddit.com/submit?url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title)); return false;"><img src="../img/social_flat_rounded_rects_svg/Reddit.svg" /></a></li>
                                    <li><a href={"mailto:?subject=&body="+encodeURIComponent(window.location.href)} target="_blank" title="Email" onclick="window.open('mailto:?subject=' + encodeURIComponent(document.title) + '&body=' +  encodeURIComponent(document.URL)); return false;"><img src="../img/social_flat_rounded_rects_svg/Email.svg" /></a></li>
                                </ul>
                            </div>


                            <div className="video-comments white">
                                <div id="fb-root"></div>
                                <div className="fb-comments" dataHref={this.state.omgurl} width="100%" dataNumposts="5"></div>
                            </div>
                        </div>
                             : (<div className="video-details white">
                                <img src="../img/vidinfoloading.png" width="100%" />
                            </div>
                            )
                        }

                    </div>
                    <div className="right white">
                        <div className="sidebar-video-list">
                        Recommended
                            <div className="line"></div>
                            {
                                relatedVideos ? <div>
                                {relatedVideos.map(video =>{
                                    return(<div key={video.id.videoId}>
                                        <div className="sidebar-video">
                                        <div className="sidebar-video-thumbnail">
                                            <a className="title-link" onClick={_=> this.gotoVideo(video.id.videoId)}> <img src={video.snippet.thumbnails.medium.url} width="100%"/></a>
                                        </div>
                                        <div className="sidebar-video-info">
                                            <div className="video-title">
                                                <a className="title-link" onClick={_=> this.gotoVideo(video.id.videoId)}>{video.snippet.title}</a>
                                            </div>
                                            <Link to={`/channel/${video.snippet.channelId}/relevance`}><div className="video-channel">{video.snippet.channelTitle}</div></Link>
                                        </div>
                                    </div>
                                        <div className="line"></div>
                                    </div>)
                                })}

                                </div>: <div>
                                    <img src="../img/sidebarloading.png" width="100%" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            )
        //}catch(e){
        //        console.log(e);
        //    return(<div>
        //        <Loader />
        //    </div>)
        //}
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