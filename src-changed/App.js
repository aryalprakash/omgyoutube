import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import {getVideoData, getChannelVideos} from './actions/video.js'

import Header from './Header.js'
import Loader from './Loader.js'

const channels = ['UCrzyJYtjLOTfnUur8hsr7ow', 'UC7WYScFxhgJeeL_sJkd8JYg', 'UCE80xxtgnBxqb3DR6ThohvA', 'UCNR1KcWXj7zpWQFJtU3ddYg', 'UCxCoea3ulOukfXiYAm87ZIA', 'UCsnH4_UnQs5D-ye-SEnHxpg', 'UCd97ukfGaYt4LKtIgKm9Vhw']


export default class App extends Component {

  componentWillMount(){
    channels.map(channelId => this.props.dispatch(getChannelVideos(channelId)))
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
    let channels = this.props.state;
    return (<div>

      <div className="home-content white">
          {
            channels ? channels.map(channel => {
              return (<div className="channel">
                  <div className="channel-link">{channel.items[0].snippet.channelTitle}</div>
                <div className="video-lists">

              {channel.items.map(item => {
                return (
                    <div className="video-card">
                      <div className="video-thumb">
                        <img width="100%" src={item.snippet.thumbnails.medium.url} />
                      </div>
                      <div className="video-tab-info">
                        <div className="video-title">
                          <Link className="title-link" to={`/watch/v=${item.id.videoId}`}>{item.snippet.title}</Link>
                        </div>
                        <div className="video-channel homepage"><span className="half-left">{item.snippet.channelTitle}</span><span className="half-right">{this.timeSince(new Date(item.snippet.publishedAt))}</span></div>
                      </div>
                    </div>
                )
              })
                  }
              </div>
              <div className="line"></div>
              </div>
              )
            }) :  null
          }

            </div></div>);
    }
    catch(e){
      return(<div>
      <Header />
      <Loader />
      </div>)
    }
  }
}

App.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps)( App )

