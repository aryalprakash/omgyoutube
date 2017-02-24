import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import {getVideoData, getRelatedVideos, searchVideo, getChannelVideos, getMoreVideos} from './actions/video.js'

import Header from './Header.js'
import Home from './Home.js'
import Loader from './Loader.js'

const channels = ['UCrzyJYtjLOTfnUur8hsr7ow', 'UC7WYScFxhgJeeL_sJkd8JYg', 'UCE80xxtgnBxqb3DR6ThohvA', 'UCNR1KcWXj7zpWQFJtU3ddYg', 'UCxCoea3ulOukfXiYAm87ZIA', 'UCsnH4_UnQs5D-ye-SEnHxpg', 'UCd97ukfGaYt4LKtIgKm9Vhw']


export default class Search extends Component {

    componentWillMount(){
        //channels.map(channelId => this.props.dispatch(getChannelVideos(channelId)))
        this.props.dispatch(searchVideo(this.props.routeParams.query));
        this.setState({
            query: this.props.routeParams.query,
            renderSearch: false
        })

    }

    gotoVideo(videoId){
        this.props.dispatch(getRelatedVideos(videoId));
        this.props.dispatch(getVideoData(videoId));
        this.context.router.push(`/watch/v=${videoId}`);
    }

    getMoreResults(query, token){
        this.props.dispatch(getMoreVideos(query, token));
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

    toggleView = () => {
        this.setState({
            renderSearch: true
        })
    }

    render() {
        try{
            let searchResults = this.props.searchResults;
            let token = this.props.token;
            const {renderSearch} = this.state

            return (<div>
                <Header nav={this.props.routeParams} toggleView={this.toggleView} />
            {renderSearch ? (
                <div className="home-content white">
                {
                    searchResults.map(video=>{
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
                    })
                    }
                    <div className="paging">
                        <span className="page-number" onClick={_=> this.getMoreResults(this.props.routeParams.query, token)}>Next Page</span>
                    </div>
                </div>
            ): <Home /> }
               </div>);
        }
        catch(e){
            console.log(e);
            return(<div>
                <Header />
                <Loader />
            </div>)
        }
    }
}

Search.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = ({searchResults, state, token}) => ({searchResults, state, token})

export default connect(mapStateToProps)( Search )

