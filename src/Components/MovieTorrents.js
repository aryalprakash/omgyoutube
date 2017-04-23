import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import {getMovieList, getMoreMovies, flushCurrentData} from '../actions/video.js'
import Helmet from "react-helmet";
import {SERVER_URL} from'../constants/ActionTypes.js'

import Loader from './Loader.js'

let style={
    relative: {
        position: 'relative'
    },
    loader: {
        position: 'relative',
        margin: '5px auto',
        width: '50px',
        textAlign: 'center'
    },
    selector: {
        fontSize: '14px',
        height: '36px',
        border: '1px solid #d7d7d7',
        color: '#494848',
        width: '130px'
    },
    header:{
        background: '#f1f1f1',
        padding: '10px'
    },
    input: {
        padding: '5px',
        width: '300px',
        height: '35px',
        border: '1px solid #d7d7d7'
    }
};

export default class MovieTorrents extends Component {

    constructor() {
        super()
        this.state = {
            query: '',
            genre: '',
            order: '',
            rating: ''
        }

        this.genreChange = this.genreChange.bind(this)
        this.orderChange = this.orderChange.bind(this)
        this.ratingChange = this.ratingChange.bind(this)
        this.queryChange = this.queryChange.bind(this)
        this._handleKeyPress = this._handleKeyPress.bind(this)
    }

    _keeplog(){
        //var data = new FormData();
        //data.append("type", "Movie");
        //data.append("query", this.state.query!=''?this.state.query:this.state.genre);
        //fetch(SERVER_URL+"/searchlog.php",
        //    {
        //        method: "POST",
        //        body: data
        //    })
        //    .then(function(res){ return res.json(); });
    }


    componentWillMount(){
        this.props.dispatch(flushCurrentData());
        if(!this.props.movies)
            this.searchMovie();
    }

    componentWillReceiveProps(){
        this.setState({
            renderSearch: false,
            loader: false,
            mainloader: false
        })
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.searchMovie();
        }
    }

    genreChange(event){
        this.setState({
            genre: event.target.value
        }, function(){
            //console.log(this.state.genre)
            //this.props.dispatch(getMovieList(this.state.query, this.state.genre, this.state.rating, this.state.order));
        })
    }

    orderChange(event){
        this.setState({
            order: event.target.value
        }, function(){
            //console.log(this.state.order)
            //this.props.dispatch(getMovieList(this.state.query, this.state.genre, this.state.rating, this.state.order));
        })
    }
    ratingChange(event) {
        this.setState({
            rating: event.target.value
        }, function () {

        })
    }

    queryChange(event){
        this.setState({
            query: event.target.value
        })
    }

    searchMovie(){
        this.setState({mainloader: true}, function() {
            this.props.dispatch(getMovieList(this.state.query, this.state.genre, this.state.rating, this.state.order));
        })
        this._keeplog();
    }

    loadMoreMovies(page){
        this.setState({loader: true}, function(){
            this.props.dispatch(getMoreMovies(this.state.query, this.state.genre, this.state.rating, this.state.order, page))
        });
    }



    render() {
        try{
            let {movies, loader} = this.props;
            const {renderSearch} = this.state;
            let title = "Download HD Movie Torrents | OMG Youtube";
            let description = "Watch Movie Trailers and download HD Movie Torrents. Collection of latest and popular HD Movie torrents. Filter by genre, year or rating.";
            let thumbnail = "http://omgyoutube.com/img/download%20youtube%20videos.png";
            let keywords = "omg youtube, youtube downloader, movie torrents, torrent downloader, easiset youtube downloader, youtube to mp4, youtube to mp3, hd movie torrents, download videos";

            return (<div>
                    <Helmet
                        htmlAttributes={{"lang": "en", "amp": undefined}}
                        title={"Download HD Movie Torrents | OMG Youtube"}
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
                    <div className="movie-filter" style={style.header}>
                        <div className="filter">
                            <div className="filter-title">Genre</div>
                            <div className="filter-input">
                                <select  className="movie-selector" value={this.state.genre} onChange={this.genreChange}>
                                    <option className="opt" value="">All</option>
                                    <option className="opt" value="Action">Action</option>
                                    <option className="opt" value="Adventure">Adventure</option>
                                    <option className="opt" value="Animation">Animation</option>
                                    <option className="opt" value="Biography">Biography</option>
                                    <option className="opt" value="Comedy">Comedy</option>
                                    <option className="opt" value="Crime">Crime</option>
                                    <option className="opt" value="Documentary">Documentary</option>
                                    <option className="opt" value="Drama">Drama</option>
                                    <option className="opt" value="Family">Family</option>
                                    <option className="opt" value="Fantasy">Fantasy</option>
                                    <option className="opt" value="Horror">Horror</option>
                                    <option className="opt" value="Music">Music</option>
                                    <option className="opt" value="Romance">Romance</option>
                                    <option className="opt" value="Sci-Fi">Sci-Fi</option>
                                    <option className="opt" value="Thriller">Thriller</option>
                                    <option className="opt" value="War">War</option>
                                </select>
                            </div>
                        </div>
                        <div className="filter">
                            <div className="filter-title">Rating</div>
                            <div className="filter-input">
                                <select className="movie-selector" value={this.state.rating} onChange={this.ratingChange}>
                                    <option className="opt" value="Video">All</option>
                                    <option className="opt" value="9">9+</option>
                                    <option className="opt" value="8">8+</option>
                                    <option className="opt" value="7">7+</option>
                                    <option className="opt" value="6">6+</option>
                                    <option className="opt" value="5">5+</option>
                                    <option className="opt" value="4">4+</option>
                                    <option className="opt" value="3">3+</option>
                                    <option className="opt" value="2">2+</option>
                                    <option className="opt" value="1">1+</option>
                                </select>
                            </div>
                        </div>
                        <div className="filter">
                            <div className="filter-title">Order By</div>
                            <div className="filter-input">
                                <select className="movie-selector" value={this.state.order} onChange={this.orderChange}>
                                    <option className="opt" value="Latest">Latest</option>
                                    <option className="opt" value="Oldest">Oldest</option>
                                    <option className="opt" value="Seeds">Seeds</option>
                                    <option className="opt" value="Peers">Peers</option>
                                    <option className="opt" value="Year">Year</option>
                                    <option className="opt" value="Rating">Rating</option>
                                    <option className="opt" value="Likes">Likes</option>
                                    <option className="opt" value="Downloads">Downloads</option>
                                </select>
                            </div>
                        </div>
                        <div className="search-box">
                            <div className="filter-title">Search Term</div>
                            <div className="filter-input">
                                <input type="text"className="movie-search-input" onKeyPress = {this._handleKeyPress} onChange={this.queryChange} value={this.state.query} placeholder="Search for Movie Torrents" />
                            </div>
                        </div>
                        <div className="search-button">
                            <div className="filter-title"> </div>
                            <div className="movie-search" onClick={_=>this.searchMovie()}>Search</div>
                        </div>
                    </div>
                {!this.state.mainloader && movies && movies.movies && movies.movies.length > 0 ? <div className="home-content search-content white">
                    <div className="video-lists movie-lists">
               {movies.movies.map(movie=> {
                   return (<div>
                       <div className="video-card movie-card" key="movie.id">
                           <div className="video-thumb movie-home-thumb">
                               <div className="movie-hover-details">
                                   <div className="ratings">{movie.rating}/10</div>

                      {movie.genres.map(genre=><div className="hover-genre">{genre}</div>)}
                                   <Link className="link" to={`/movie/v=${movie.id}`}>
                                       <div className="movie-go">View Details</div>
                                   </Link>
                               </div>
                               <img width="100%" src={movie.medium_cover_image} />
                           </div>
                           <div className="video-tab-info movie-home-info">
                               <div className="video-title movie-home-title">
                                   <Link className="title-link movie-title" to={`/movie/v=${movie.id}`}>{movie.title_english}</Link>
                               </div>
                               <div className="video-channel homepage movie-details">
                                   <span className="half-left">{movie.year}</span>
                                   <span className="half-right">{}</span>
                               </div>
                           </div>
                       </div>
                   </div>
                   )
               })
                   }
                    </div>
                    { movies && movies.movies && movies.movie_count > movies.movies.length ? <div className="paging">
                        {this.state.loader ? <div style={style.loader}>
                            <div className="signal"></div>
                        </div> : <span className="page-number" onClick={_=> this.loadMoreMovies(movies.page_number + 1)}>Get More Results</span>}
                    </div> : null}
                </div> : <div>
                    <div className="home-content white" style={style.relative}>
                        {this.state.mainloader?<div className="signal-container"><div className="signal"></div></div>:<div className="no-results">Sorry! We couldn't find what you're looking for.</div>}
                    </div>
                </div>
                    }
                    </div>)
        }
        catch(e){
            console.log(e);
            return(<div>
                <Loader />
            </div>)
        }
    }
                    }

MovieTorrents.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = ({searchResults, state, movies, loader}) => ({searchResults, state, movies, loader})

export default connect(mapStateToProps)( MovieTorrents )

