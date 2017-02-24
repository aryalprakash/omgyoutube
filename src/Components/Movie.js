import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import Helmet from "react-helmet";


import {SERVER_URL} from'../constants/ActionTypes.js'
import { getMovieList, getMovieSuggestions, getMovieDetails} from '../actions/video.js'
import Header from './Header.js'
import Loader from './Loader.js'

let style={
    padding: {
        padding: '10px'
    },
    marginTop: {
        marginTop: '30px'
    }
}



class Movie extends Component {

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
        if(!this.props.movieDetails)
            this.props.dispatch(getMovieDetails(this.props.routeParams.videoID));

        if(!this.props.movieSuggestions)
            this.props.dispatch(getMovieSuggestions(this.props.routeParams.videoID));
    }

    componentWillReceiveProps(){
        //this.setState({omgurl: `${SERVER_URL}/#/watch/v=${this.props.routeParams.videoID}`})
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

    listThisGenre(genre){
        this.props.dispatch(getMovieList(this.state.query, genre, this.state.rating, this.state.order))
        this.context.router.push(`/movie-torrents`);
    }

    gotoMovie(videoId){
        this.props.dispatch(getMovieSuggestions(videoId));
        this.props.dispatch(getMovieDetails(videoId));
        this.context.router.push(`/movie/v=${videoId}`);
    }

    render() {
        let {movieDetails, movieSuggestions} = this.props;
        //console.log(this.props.movieSuggestions)
        let relatedVideos, videoData, title, tweetTitle, url, omgurl, uploader, uploader_id, thumbnail, description, synopsis, download_button, formats, format_list, mp3, views, keywords, genres;

        this.state.omgurl = `http://omgyoutube.com/#/movie/v=${this.props.routeParams.videoID}`;
        let Iframe="iframe"
        let trailer, movie_title;
        if(this.props.movieDetails){
            trailer = this.props.movieDetails.movie.yt_trailer_code;
            movie_title = this.props.movieDetails.movie.title_english;
            synopsis = this.props.movieDetails.movie.description_full;
            download_button =  <a href={this.props.movieDetails.movie.torrents[0].url} download ={movie_title+".torrent"}><div className="download-button download-torrent">Download Torrent</div></a>;
            format_list = this.props.movieDetails.movie.torrents.map(vid => <div className="movie-down"><a href={vid.url} className="down_box" key={vid.hash}><div className="dwn_format dwn_movie" >{vid.quality}<span className="file-size">{vid.size}</span></div></a><a href={"magnet:?xt=urn:btih:"+vid.hash+"&dn="+movie_title+"&tr=http://track.one:1234/announce&tr=udp://track.two:80"}><img src="../../img/magnet.png" width="20px" /></a></div> )
            thumbnail = this.props.movieDetails.movie.medium_cover_image;
            genres = this.props.movieDetails.movie.genres.map(genre => <div className="genre" onClick={_=>this.listThisGenre(genre)}>{genre}</div>)
        }


        const video = this.props.routeParams.videoID;
        return (<div>
            <Helmet
                htmlAttributes={{"lang": "en", "amp": undefined}}
                title={movie_title ? "Download "+ movie_title+" : OMG Youtube" : "OMG Youtube"}
                defaultTitle="OMG! Download videos from Youtube"
                meta={[
                    {"name": "description", "content": description},
                    {"name": "keywords", "content": keywords},
                    {"property": "og:site_name", "content": "OMG Youtube"},
                    {"property": "og:url", "content": omgurl},
                    {"property": "og:title", "content": "Download "+ title},
                    {"property": "og:image", "content": thumbnail},
                    {"property": "og:type", "content": video}
                ]}
            />
            <div className="transparent">
                <div className="left" ref="left">
                    <div className="video">
                        <div className="video-container" ref="videoFrame">
                            <iframe className="video" src={'https://www.youtube.com/embed/' + trailer + '?autoplay=1&rel=0&amp;showinfo=0'} border="none" allowFullScreen></iframe>
                        </div>
                    </div>

                        {movieDetails ? <div>
                            <div className="video-details white">
                                <div className="video-details-content movieCard">
                                    <div className="movieThumb">
                                        <img src={thumbnail} width="100%"/>
                                    </div>
                                    <div className="movieDetails">
                                    <div className="video-details-title">{movie_title}</div>
                                    <div className="video-info">
                                        <div>
                                            <div className="video-channel halfleftko">{this.props.movieDetails.movie.year}</div>
                                            <div className="halfrightko"><span className="views">Ratings: {this.props.movieDetails.movie.rating}/10</span></div>
                                        </div>
                                        <div className="movie-genres">{genres}</div>
                                        <div className="download">
                                        {download_button}
                                        {format_list}
                                        </div>
                                    </div>
                                    </div>
                                </div>

                            </div>
                            <div className="video-details white" style={style.padding}>
                            Synopsis
                                <br />
                                <div className="movie-description">{synopsis}</div>
                            </div>

                            <div className="video-share white" style={style.padding}>
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
                    Casts
                        <div className="line"></div>

                        {
                        movieDetails && movieDetails.movie.cast && movieDetails.movie.cast.length > 0?<div className="movie-casts">
                            {
                                this.props.movieDetails.movie.cast.map(cast => <div className="movie-cast">
                                    <div className="movie-cast-thumb">
                                        <img className="movie-cast-thumb" src={cast.url_small_image} width="100%"/>
                                    </div>
                                    <div className="movie-cast-details">
                                        <div className="cast-fullName">{cast.name}</div>
                                        <div className="cast-role">{cast.character_name}</div>
                                    </div>
                                </div> )

                                }

                        </div>:<div>
                            <img src="../img/sidebarloading.png" width="100%" />
                        </div>
                        }

                        {movieSuggestions?<div style={style.marginTop}>
                            Similar Movies
                            <div className="line"></div>
                            <div className="similar-movies">
                            {movieSuggestions.movies.map(movie=><div className="video-card movie-card similar-movie">
                                <div className="video-thumb movie-home-thumb title-link" onClick={_=>this.gotoMovie(movie.id)}>
                                    <img width="100%" src={movie.medium_cover_image} />
                                </div>
                                <div className="video-tab-info movie-home-info">
                                    <div className="video-title movie-home-title">
                                        <div className="title-link movie-title" onClick={_=>this.gotoMovie(movie.id)}>{movie.title_english}</div>
                                    </div>
                                    <div className="video-channel homepage movie-details">
                                        <span className="cast-role">{movie.year}</span>
                                    </div>
                                </div>
                            </div>)}
                            </div>
                        </div>:null}

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

Movie.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = ({ movieDetails, movieSuggestions }) => ({
    movieDetails,
    movieSuggestions
})

export default connect(mapStateToProps)( Movie )