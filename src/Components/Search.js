import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import {getVideoData, getRelatedVideos, searchVideo, flushCurrentData, getChannelVideos, getMoreVideos} from '../actions/video.js'
import Helmet from "react-helmet";
import {SERVER_URL} from'../constants/ActionTypes.js'

import Loader from './Loader.js'

//const channels = ['UCrzyJYtjLOTfnUur8hsr7ow', 'UC7WYScFxhgJeeL_sJkd8JYg', 'UCE80xxtgnBxqb3DR6ThohvA', 'UCNR1KcWXj7zpWQFJtU3ddYg', 'UCxCoea3ulOukfXiYAm87ZIA', 'UCsnH4_UnQs5D-ye-SEnHxpg', 'UCd97ukfGaYt4LKtIgKm9Vhw']


export default class Search extends Component {

    componentWillMount(){
        //channels.map(channelId => this.props.dispatch(getChannelVideos(channelId)))
        this.props.dispatch(flushCurrentData());
        this.props.dispatch(searchVideo(this.props.routeParams.query));
    }

    componentWillReceiveProps(){
        this.setState({
            query: this.props.routeParams.query,
            renderSearch: false
        })
    }

    gotoVideo(videoId){
        //this.props.dispatch(getRelatedVideos(videoId));
        //this.props.dispatch(getVideoData(videoId));
        this.context.router.push(`/watch/v=${videoId}`);
    }

    getMoreResults(query, token){
        this.props.dispatch(getMoreVideos(query, token));
    }


    render() {
        try{
            let searchResults = this.props.searchResults;
            let token = this.props.token;
            const {renderSearch} = this.state;
            if(searchResults && searchResults.length > 0) {
                return (<div>
                    <Helmet
                        htmlAttributes={{"lang": "en", "amp": undefined}}
                        title={"Search results for "+ this.props.routeParams.query}
                        defaultTitle="OMG! Download videos from Youtube"
                    />
            {searchResults ? (
                <div className="home-content search-content white">
                {
                    searchResults.map(video=> {
                        return (<div>
                            <div className="sidebar-video">
                                <div className="sidebar-video-thumbnail search-list-thumbnail">
                                    <img src={video.snippet.thumbnails.medium.url} width="100%"/>
                                </div>
                                <div className="sidebar-video-info search-list-info">
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
                        <span className="page-number" onClick={_=> this.getMoreResults(this.props.routeParams.query, token)}>Get More Results</span>
                    </div>
                </div>
            ) : <App /> }
                </div>);
            } else return(<div>
                <div className="home-content white">
                <div className="no-results">No results found for "{this.props.routeParams.query}." Maybe you'd like to watch these videos.</div>
                    <App />
            </div></div>)
        }
        catch(e){
            console.log(e);
            return(<div>
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

