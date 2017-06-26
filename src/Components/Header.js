import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import {SERVER_URL} from'../constants/ActionTypes.js'

import {searchVideo, suggestSearchQuery, flushCurrentData, saveQuery, getMovieSuggestions, getMovieDetails, getRelatedVideos, getVideoData} from '../actions/video.js'
import PlayMenu from './PlayMenu.js'

let style={

}

export class Header extends Component {

    constructor(){
        super()
        this.state = {
            query: '',
            viewShown: false,
            nav: false,
            focus: false
        }

        this._handleKeyPress = this._handleKeyPress.bind(this)
        this._toggleSidebar = this._toggleSidebar.bind(this);
        this._hideSidebar = this._hideSidebar.bind(this);
        this._suggestSearchQuery = this._suggestSearchQuery.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._changeQuery = this._changeQuery.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._optionChange = this._optionChange.bind(this);
        this.gotoMovie = this.gotoMovie.bind(this);
    }

    ytVidId(url) {
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? RegExp.$1 : false;
    }

    gotoVideo(videoId){
        if(this.state.detailsPage) {
            this.props.dispatch(getRelatedVideos(videoId));
            this.props.dispatch(getVideoData(videoId));
        }
        this.context.router.push(`/watch/v=${videoId}`);
    }

    gotoMovie(movieId, title){
        this.setState({
            query: title,
            focus: false
        }, function(){
            if(this.state.detailsPage) {
                this.props.dispatch(getMovieSuggestions(movieId));
                this.props.dispatch(getMovieDetails(movieId));
            }
            this.context.router.push(`/movie/v=${movieId}`);
        });
    }

    browseAllMovies(){
        this.setState({
            focus: false
        }, function() {
            this.context.router.push('/movie-torrents');
        })
    }


    componentWillMount(){
        this.props.nav ?
        this.setState({
            query: this.props.nav.query
        }) : null

        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            if(localStorage.select){
                this.setState({
                    select: localStorage.select
                })
            } else{
                this.setState({
                    select: "Video"
                })
            }
        } else {
           console.log("No web storage")
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.props.params.videoID){
            this.setState({
                detailsPage: true
            })
        } else {
            this.setState({
                detailsPage: false
            })
        }
    }

    _keeplog(){
        var data = new FormData();
        data.append("type", "Video");
        data.append("query", this.state.query);
        //fetch(SERVER_URL+"/searchlog.php",
        //    {
        //        method: "POST",
        //        body: data
        //    })
        //    .then(function(res){ return res.json(); });
    }


    _searchVideo(){
        this.setState({
            focus: false
        }, function(){
            this.props.dispatch(saveQuery(this.state.query));
            this.props.dispatch(searchVideo(this.state.query));
            this.context.router.push(`/search/${this.state.query}`);
            this._keeplog();
        })
        }

    _suggestSearchQuery(){
        if(this.state.query.length>0) {
            this._onFocus()
            //if(this.state.select == "Video")
            this.setState({
                suggestLoader: true
            })
                this.props.dispatch(suggestSearchQuery(this.state.select, this.state.query));
        } else{
            //this.props.dispatch(flushCurrentData());
            this.setState({
                focus: false
            })
        }
    }


    _onFocus(){
        this.setState({
            focus: true
        })
    }

    _onBlur(e){
        var currentTarget = e.currentTarget;
        setTimeout(function() {
            if (!currentTarget.contains(document.activeElement)) {
                this.setState({
                    focus: false
                })
            }
        }.bind(this), 0);
    }

    _changeQuery(query){
        this.setState({
            query: query,
            focus: false
        }, function(){
            this._searchVideo()
        });
    }

    _checkVid(){
        let check = this.ytVidId(this.state.query);
        if( check === false){
            this._searchVideo();
        } else {
            this.gotoVideo(check)
        };
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if(this.state.select == "Video"){
                this._checkVid();
            } else {
                this.browseAllMovies();
            }
        }
    }

    _handleChange(event) {
        this.setState({query: event.target.value});
    }

    _optionChange(event) {
        this.setState({select: event.target.value}, function(){
            localStorage.setItem("select", this.state.select);
            });
    }

    _toggleSidebar(){
        this.setState({
            nav: !this.state.nav
        })
    }

    _hideSidebar(){
        this.setState({
            nav: false
        })
    }

    render(){
        const {toggleView, searchQueries, query, select} = this.props

        let IFR = "iframe"
        return(<div className="row head ">
            <div className="twenty">
                <div className="nav-icon" onClick={this._toggleSidebar}>
                    <img src="/img/nav.png" width="100%" />
                </div>
                <Link className="link" to="/">
                    <img src="/img/logo.png" className="logo" width="100%" />
                    <div className="logo-name">OMG Youtube</div>
                </Link>
            </div>
            <div className="search sixty" tabIndex="-1" onBlur={this._onBlur}>
                <div className="ninty">
                    <select className="selector" value={this.state.select} onChange={this._optionChange}>
                        <option className="opt" value="Video">Video</option>
                        <option className="opt" value="Movie">Movie</option>
                    </select>
                    <input type="text"
                        className="input-box"
                        placeholder={this.state.select =="Video"?"Search or paste the video link":"Search for Movie Torrents"}
                        value={this.state.query}
                        onChange={this._handleChange}
                        onFocus = {this._onFocus}
                        onKeyPress = {this._handleKeyPress}
                        onKeyUp = {this._suggestSearchQuery}
                    />
                {this.state.focus && this.state.query.length>0 && this.state.suggestLoader && !searchQueries ?<div className="signal"></div>:null}
                </div>
                    <button className="search-icon-box" onClick={_=>this._checkVid()}>
                        <img src="/img/search.png" className="search-icon"/>
                    </button>
                <div>
                {
                    select=="Video" && this.state.focus && searchQueries && searchQueries!=="empty"?<div className="searchSuggestions"  tabIndex="-1">
                        {searchQueries.map(query=><div className="suggestion" key={query[0]} onClick={_=>this._changeQuery(query[0])}>{query[0]}</div>)}
                    </div>: null
                }

                {
                    select=="Movie" && this.state.focus && searchQueries? searchQueries!=="empty"?<div className="searchSuggestions"  tabIndex="-1">
                        {searchQueries.map(movie=><div className="movieSuggestion" onClick={_=>this.gotoMovie(movie.id, movie.title)}>
                            <div className="thumbnail">
                                <img src={movie.small_cover_image} />
                            </div>
                            <div className="details">
                                <div className="suggest-title">{movie.title}</div>
                                <div className="suggest-subtitle">{movie.year}</div>
                            </div>
                        </div>)}
                        <div className="browse-all" onClick={_=>this.browseAllMovies()}>Browse all movies</div>
                        </div>: <div className="searchSuggestions"  tabIndex="-1">
                        <div className="browse-all" onClick={_=>this.browseAllMovies()}>Browse all movies</div>
                        </div> :null
                    }
                </div>
                </div>
                <div className="social-actions">
                    <div className="fb-actions">
                        <div id="fb-root"></div>
                        <div className="fb-like" data-href="https://facebook.com/OMGYoutubeAPP" data-layout="button" data-action="like" data-size="large" data-show-faces="false" data-share="true"></div>
                    </div>
                </div>

            <div className={this.state.nav ? "playlistSidebar block" : "playlistSidebar"} ref="sidebar">
                <div className="thismenu slide-in"><PlayMenu show={this._hideSidebar}/></div>
                <div className="blank" onClick={_=>this._toggleSidebar()}></div>
            </div>
        </div>
        )
    }
}


Header.contextTypes = {
    router: React.PropTypes.object
}
const mapStateToProps = ({ query, searchQueries, select }) => ({
    query,
    searchQueries,
    select
})

export default connect(mapStateToProps)( Header )