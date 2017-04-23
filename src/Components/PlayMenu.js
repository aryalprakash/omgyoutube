import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'

import {getAllPlaylistVideos} from '../actions/video.js';
import {PLAYLISTS, Collections, SERVER_URL} from '../constants/ActionTypes.js'

export default class PlayMenu extends Component {

    _keeplog(value){
        //var data = new FormData();
        //data.append("page", value);
        //fetch(SERVER_URL+"/visitlog.php",
        //    {
        //        method: "POST",
        //        body: data
        //    })
        //    .then(function(res){ return res.json(); });
    }

    _goto(type, playlist, slug){
        this.props.show ? this.props.show() : '';
        if(type === 'playlist') {
            let playlist_id = PLAYLISTS.find(x=> x.name === playlist).id;
            this.props.dispatch(getAllPlaylistVideos(playlist_id));
            this.context.router.push(`/playlist/${playlist}`);
            this._keeplog(playlist)
        }else{
            let playlist_id = Collections[playlist].find(x=> x.slug === slug).id;
            this.props.dispatch(getAllPlaylistVideos(playlist_id));
            this.context.router.push(`/collection/${playlist}/${slug}`);
            this._keeplog(playlist+":"+slug)
        }
    }

    render(){
        let type = this.props.path;
        return(<div className="playlist-menu mobile">
        {type === undefined ? <Link to="/"><div className="playlist-button  active" onClick={_=>this._goto()}>Home</div></Link> : <Link to="/"><div className="playlist-button ">Home</div></Link>}
        {type === 'Music' ? <div className="playlist-button active" onClick={_=>this._goto('collection', 'Music', 'nepali')}>Music</div> : <div className="playlist-button " onClick={_=>this._goto('collection', 'Music', 'nepali')}>Music</div>}
        {type === 'Movies' ? <div className="playlist-button active" onClick={_=>this._goto('collection','Movies', 'nepali')}>Movies</div> : <div className="playlist-button " onClick={_=>this._goto('collection','Movies','nepali')}>Movies</div>}
        {type === 'TV-Series' ? <div className="playlist-button active" onClick={_=>this._goto('collection','TV-Series', 'bhadragol')}>TV Series</div> : <div className="playlist-button " onClick={_=>this._goto('collection','TV-Series','bhadragol')}>TV Series</div>}
        {type === 'omg' ? <div className="playlist-button active" onClick={_=>this._goto('playlist','omg')}>OMG</div> : <div className="playlist-button " onClick={_=>this._goto('playlist','omg')}>OMG</div>}
        {type === 'cute' ? <div className="playlist-button active" onClick={_=>this._goto('playlist','cute')}>Aww</div> : <div className="playlist-button " onClick={_=>this._goto('playlist','cute')}>Aww</div>}
        {type === 'doityourself' ? <div className="playlist-button active" onClick={_=>this._goto('playlist','doityourself')}>DIY</div> : <div className="playlist-button " onClick={_=>this._goto('playlist','doityourself')}>DIY</div>}
        {type === 'funny' ? <div className="playlist-button active" onClick={_=>this._goto('playlist','funny')}>LOL</div> : <div className="playlist-button " onClick={_=>this._goto('playlist','funny')}>LOL</div>}
        {type === 'amazing' ? <div className="playlist-button active" onClick={_=>this._goto('playlist','amazing')}>WOW</div> : <div className="playlist-button " onClick={_=>this._goto('playlist','amazing')}>WOW</div>}
        {type === 'nsfw' ? <div className="playlist-button active" onClick={_=>this._goto('playlist','nsfw')}>NSFW</div> : <div className="playlist-button " onClick={_=>this._goto('playlist','nsfw')}>NSFW</div>}
        {type === 'live' ? <div className="playlist-button active" onClick={_=>this._goto('playlist','live')}>Live</div> : <div className="playlist-button " onClick={_=>this._goto('playlist','live')}>Live</div>}
        </div>
        )
    }

};

PlayMenu.contextTypes = {
    router: React.PropTypes.object
}


export default connect()( PlayMenu )