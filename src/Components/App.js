import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory, Link } from 'react-router'
import Helmet from "react-helmet";
import {getVideoData, getChannelVideos, clearChannelVideos, flushCurrentData, getPlaylistVideos, getMovieList} from '../actions/video.js'
import {SERVER_URL} from'../constants/ActionTypes.js'

import Header from './Header.js'
import Loader from './Loader.js'
import PlayMenu from './PlayMenu.js'
import Slider from './Slider.js'

let channels = ['UCrzyJYtjLOTfnUur8hsr7ow', 'UC7WYScFxhgJeeL_sJkd8JYg', 'UCE80xxtgnBxqb3DR6ThohvA', 'UCNR1KcWXj7zpWQFJtU3ddYg', 'UCxCoea3ulOukfXiYAm87ZIA', 'UCsnH4_UnQs5D-ye-SEnHxpg', 'UCd97ukfGaYt4LKtIgKm9Vhw', 'UCq-Fj5jknLsUf-MWSy4_brA', 'UCX52tYZiEh_mHoFja3Veciw', 'UC56gTxNs4f9xZ7Pa2i5xNzg', 'UCJrDMFOdv1I2k8n9oK_V21w', 'UCe_vXdMrHHseZ_esYUskSBw', 'UCUK0HBIBWgM2c4vsPhkYY4w','UCPDis9pjXuqyI7RYLJ-TTSA']
let playlist = [{name:"Editor's Picks", id:'PLlpHoeIVvNBsY2UdwZaWtKXdAGsaM77h9'}];

export default class App extends Component {

  constructor(){
    super()
    this.state = {
      query: null
    }
  }


  getMeRandomElements(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len;
    }
    return result;
  }

  componentWillMount(){
    this.props.dispatch(clearChannelVideos());
    this.props.dispatch(flushCurrentData());
    channels = this.getMeRandomElements(channels, 7);
    playlist.map(playlistId=> this.props.dispatch(getPlaylistVideos(playlistId.id)))
    channels.map(channelId => this.props.dispatch(getChannelVideos(channelId)))
    this.props.dispatch(getMovieList())

    this.keeplog()
  }

  keeplog(){
    var data = new FormData();
    data.append("page", "index");
    fetch(SERVER_URL+"/visitlog.php",
        {
          method: "POST",
          body: data
        })
        .then(function(res){ return res.json(); });
  }

  _gotoChannel(channelId, channelName){
    this.setState({query : channelName});
    this.context.router.push(`/channel/${channelId}/relevance`);
  }

  timeSince = (date) =>{

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval +  ' years ago';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months ago';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days ago';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours ago';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes ago';
    }
    return Math.floor(seconds) + ' seconds ago';
  }

  render() {
    try{
      let channels = this.props.channels;
      let playlists = this.props.playlists;
      let movies = this.props.movies;
      //console.log(this.props)
      if(channels && playlists) {
        return (<div>
          <Helmet
              htmlAttributes={{"lang": "en", "amp": undefined}}
              title={"OMG Youtube! Watch and Download Youtube Videos"}
              defaultTitle="OMG! Download videos from Youtube"
          />
          <div className="home-content white">
          {!this.props.routeParams.watch?<Slider />:''}
              <div className="paddingkolagi"></div>
            <div className="playlistHeader home-margin">
              <PlayMenu />
              <div className="header-line"></div>
            </div>

          {
              playlists ? playlists.map(channel => {
                return (<div className="channel" key={channel.items[0].id}>
                  <div className="link">
                    <div className="">{playlist.find(x=> x.id === channel.items[0].snippet.playlistId).name}</div>
                  </div>
                  <div className="video-lists">

                {
                    channel.items.map(item => {
                      return (
                          <div className="video-card" key={item.snippet.resourceId.videoId}>
                            <div className="video-thumb">
                              <Link to={`/watch/v=${item.snippet.resourceId.videoId}`}><img width="100%" src={item.snippet.thumbnails.medium.url ? item.snippet.thumbnails.medium.url : ''} /></Link>
                            </div>
                            <div className="video-tab-info">
                              <div className="video-title">
                                <Link className="title-link" to={`/watch/v=${item.snippet.resourceId.videoId}`}>{item.snippet.title}</Link>
                              </div>
                              <div className="video-channel homepage">
                                <span className="half-left">{item.snippet.channelTitle}</span>
                                <span className="half-right">{this.timeSince(new Date(item.snippet.publishedAt))}</span>
                              </div>
                            </div>
                          </div>
                      )
                    })
                    }
                  </div>
                  <div className="line"></div>
                </div>
                )
              }) : null
              }

            {
                movies?<div className="channel">
                <div className="channel-link movies">
                  <div>Latest Movies</div>
                  <Link to="/movie-torrents"><div className="browse-movies">Browse All Movies</div></Link>
                </div>
                <div className="video-lists movie-lists">
              {movies.movies.map(movie=>{
                return(<div><div className="video-card movie-card" key="movie.id">
                  <div className="video-thumb movie-home-thumb">
                    <div className="movie-hover-details">
                      <div className="ratings">{movie.rating}/10</div>

                      {movie.genres.map(genre=><div className="hover-genre">{genre}</div>)}
                      <Link className="link" to={`/movie/v=${movie.id}`}><div className="movie-go">View Details</div></Link>
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
                  <div className="line"></div>
            </div>: null }

          {
              channels ? channels.map(channel => {
                return (<div className="channel" key={channel.items[0].snippet.channelId}>
                  <div onClick={_=>this._gotoChannel(channel.items[0].snippet.channelId, channel.items[0].snippet.channelTitle)} className="link">
                    <div className="channel-link">{channel.items[0].snippet.channelTitle}</div>
                  </div>
                  <div className="video-lists">

              {channel.items.map(item => {
                return (
                    <div className="video-card" key={item.id.videoId}>
                      <div className="video-thumb">
                        <Link to={`/watch/v=${item.id.videoId}`}><img width="100%" src={item.snippet && item.snippet.thumbnails && item.snippet.thumbnails.medium.url ? item.snippet.thumbnails.medium.url : ''} /></Link>
                      </div>
                      <div className="video-tab-info">
                        <div className="video-title">
                          <Link className="title-link" to={`/watch/v=${item.id.videoId}`}>{item.snippet.title}</Link>
                        </div>
                        <div className="video-channel homepage">
                          <span className="half-left">{item.snippet.channelTitle}</span>
                          <span className="half-right">{this.timeSince(new Date(item.snippet.publishedAt))}</span>
                        </div>
                      </div>
                    </div>
                )
              })
                  }
                  </div>
                  <div className="line"></div>
                </div>
                )
              }) : <div>
                <Loader />
              </div>
              }

          </div>
        </div>);
      }else return(<div className="home-content white"><Loader /></div>)
    }
    catch(e){
      console.log(e);
      return(<div>
      <Loader />
      </div>)
    }
  }
}

App.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = ({state, channels, playlists, movies}) => ({state, channels, playlists, movies})

export default connect(mapStateToProps)( App )

