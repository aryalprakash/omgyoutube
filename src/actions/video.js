'use strict'
import thunk from 'redux-thunk'
import { dispatch } from 'redux'
import JSONP from'jsonp'
import $ from 'jquery'
require('es6-promise').polyfill();
require('isomorphic-fetch');

import {
    GET_VIDEO_DATA,
    API_URL,
    SERVER_URL,
    API_KEY,
    GET_CHANNEL_VIDEOS,
    GET_RELATED_VIDEOS,
    GET_SEARCH_RESULTS,
    GET_SEARCH_QUERY,
    SAVE_QUERY,
    GET_MORE_VIDEOS,
    FLUSH_CURRENT_DATA,
    GET_ALL_CHANNEL_VIDEOS,
    GET_PLAYLIST_VIDEOS,
    GET_ALL_PLAYLIST_VIDEOS,
    CLEAR_VIDEOS,
    CLEAR_CHANNEL_VIDEOS,
    YTS_LIST,
    GET_MOVIE_LIST,
    GET_MORE_MOVIE_LIST,
    GET_MOVIE_DETAILS,
    GET_MOVIE_SUGGESTIONS
    } from '../constants/ActionTypes.js';

export function getVideoData (videoID) {

    return function (dispatch) {
        var myheaders = new Headers();
        myheaders.append('mode', 'no-cors')
        var myInit = {
            method: 'GET',
            headers: myheaders,
            cache: 'default'
        };

        dispatch(flushCurrentData());
        const url = API_URL+videoID;
        fetch(url).then(r => r.json()).then(res => {
            dispatch(gotVideoData(res));
            keeplog("Video", videoID, res.info.title);
        });
    }
}

export function getChannelVideos (channelId){
    return function(dispatch){
        const url = 'https://www.googleapis.com/youtube/v3/search?key='+API_KEY+'&channelId='+channelId+'&part=snippet,id&order=date&maxResults=10'
        fetch(url).then(response => response.json()).then(res => {
            dispatch(gotChannelVideos(res));
        })
    }
}

export function getRelatedVideos(videoId){
    return function(dispatch){
        const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId='+videoId+'&type=video&key='+API_KEY+'&maxResults=25'
        fetch(url).then(response => response.json()).then(res =>{
            dispatch(gotRelatedVideos(res))
        })
    }
}

export function getAllVideosFromChannel(channel, type, token){
    return function(dispatch){
        let url
            if(token){
                url = 'https://www.googleapis.com/youtube/v3/search?key='+API_KEY+'&channelId='+channel+'&pageToken='+token+'&part=snippet,id&order='+type+'&maxResults=20'
            }else{
                url = 'https://www.googleapis.com/youtube/v3/search?key='+API_KEY+'&channelId='+channel+'&part=snippet,id&order='+type+'&maxResults=20'
            }
        fetch(url).then(response => response.json()).then(res =>{
            dispatch(gotAllChannelVideos(res))
        })
    }
}



export function searchVideo(query, token){
    return function(dispatch){
        let url;
        if(token){
             url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&pageToken='+token+'&q='+query+'&type=video&key='+API_KEY+'&maxResults=20';
        }else{
             url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+query+'&type=video&key='+API_KEY+'&maxResults=20';
        }
        fetch(url).then(response => response.json()).then(res =>{
            dispatch(gotSearchResults(res))
        })
    }
}

export function suggestSearchQuery(type, query){
    return function(dispatch){
        if(type == "Video"){
            //let key= "AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg";
            let url = "http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key="+API_KEY+"&format=5&alt=json&callback=?"
            $.ajax({
                url: url,
                dataType: 'jsonp',
                type: 'GET',
                success: function(data, textStatus, jqXHR) {
                    let res= data[1];
                    dispatch(gotSuggestSearchQuery(res, type))
                }
            })
        } else if(type == "Movie"){
            let url = "https://yts.ag/api/v2/list_movies.json?limit=20&query_term="+ query;
            $.ajax({
                url: url,
                type: 'GET',
                success: function(data, textStatus, jqXHR) {
                    if(data.status == 'ok'){
                        let res = data.data.movies?data.data.movies:'empty';
                        dispatch(gotSuggestSearchQuery(res, type))
                    }
                }
            })
        }
    }
}

export function getMoreVideos(query, token){
    return function(dispatch){
        let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&pageToken='+token+'&q='+query+'&type=video&key='+API_KEY+'&maxResults=10';
        fetch(url).then(response => response.json()).then(res =>{

            dispatch(gotMoreVideos(res))
        })
    }
}

export function getMoreVideosForChannel(channel, type, token){
    return function(dispatch){
        let url = 'https://www.googleapis.com/youtube/v3/search?key='+API_KEY+'&channelId='+channel+'&pageToken='+token+'&part=snippet,id&order='+type+'&maxResults=10'
        fetch(url).then(response => response.json()).then(res =>{

            dispatch(gotMoreVideos(res))
        })
    }
}

export function getPlaylistVideos(playlist){

    return function(dispatch){
        let url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&order=date&playlistId='+playlist+'&key='+API_KEY;
        fetch(url).then(response => response.json()).then(res =>{
            res.items.sort(function(a,b){
                return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
            })
            dispatch(gotPlaylistVideos(res))
        })
    }
}

export function getAllPlaylistVideos(playlist, no){
    no? no=no: no=20
    return function(dispatch){
        dispatch(clearVideos());
        dispatch(flushCurrentData());
        let url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+no+'&order=date&playlistId='+playlist+'&key='+API_KEY;
        fetch(url).then(response => response.json()).then(res =>{
            res.items.sort(function(a,b){
                return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
            })
            dispatch(gotAllPlaylistVideos(res))
        })
    }
}


export function getMoreVideosForPlaylist(playlist, token){
    return function(dispatch){
        let url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&order=date&playlistId='+playlist+'&key='+API_KEY+'&pageToken='+token;
        fetch(url).then(response => response.json()).then(res =>{
            res.items.sort(function(a,b){
                return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
            })
            dispatch(gotMoreVideos(res))
        })
    }
}

export function getMovieList(query, genre, rating, order){
    return function(dispatch){
        let g = genre?'?genre='+genre:'';
        let r = rating? genre ?'&minimum_rating='+rating:'?minimum_rating='+rating:'';
        let o = order? genre || rating ?'&sort_by='+order:'?sort_by='+order:'';
        let q = query? genre || rating || order?'&query_term='+query:'?query_term='+query:'';
        let url = YTS_LIST+g+r+o+q;
        fetch(url).then(response => response.json()).then(res =>{
            dispatch(gotMovieList(res))
        })
    }
}

export function getMoreMovies(query, genre, rating, order, page){
    return function(dispatch){
        let g = genre?'?genre='+genre:'';
        let r = rating? genre ?'&minimum_rating='+rating:'?minimum_rating='+rating:'';
        let o = order? genre || rating ?'&sort_by='+order:'?sort_by='+order:'';
        let q = query? genre || rating || order?'&query_term='+query:'?query_term='+query:'';
        let p = query || genre || rating || order ? '&page='+page : '?page='+page;
        let url = YTS_LIST+g+r+o+q+p;
        fetch(url).then(response => response.json()).then(res =>{
            dispatch(gotMoreMovieList(res))
        })
    }
}

export function getMovieDetails(id){
    return function(dispatch){
        dispatch(flushCurrentData())
        let url = 'https://yts.ag/api/v2/movie_details.json?with_images=true&with_cast=true&movie_id='+id
        fetch(url).then(response => response.json()).then(res =>{
            dispatch(gotMovieDetails(res));
            keeplog("Movie", id, res.data.movie.title_english);
        })
    }
}

export function getMovieSuggestions(id){
    return function(dispatch){
        let url =  'https://yts.ag/api/v2/movie_suggestions.json?movie_id='+id
        fetch(url).then(response => response.json()).then(res=>{
            dispatch(gotMovieSuggestions(res))
        })
    }
}

function keeplog (type, id, title){
    var data = new FormData();
    data.append("type", type);
    data.append("id", id);
    data.append("title", title);
    //fetch(SERVER_URL+"/downloadlog.php",
    //    {
    //        method: "POST",
    //        body: data
    //    })
    //    .then(function(res){ return res.json(); });
}

export function clearChannelVideos(){
    return {type: CLEAR_CHANNEL_VIDEOS}
}

function gotVideoData(res){
    return {type: GET_VIDEO_DATA, data: res}
}

function gotChannelVideos(res){
    return {type: GET_CHANNEL_VIDEOS, data: res}
}

function gotRelatedVideos(res){
    return {type: GET_RELATED_VIDEOS, data: res}
}

function gotSearchResults(res){
    return {type: GET_SEARCH_RESULTS, data: res}
}

export function saveQuery(query){
    return {type: SAVE_QUERY, data: query}
}

function gotSuggestSearchQuery(res, select){
    return{type: GET_SEARCH_QUERY, data: res, select: select}
}

function gotAllChannelVideos(res){
    return {type: GET_ALL_CHANNEL_VIDEOS, data: res}
}

function gotMoreVideos(res){
    return {type: GET_MORE_VIDEOS, data: res}
}

function gotPlaylistVideos(res){
    return {type: GET_PLAYLIST_VIDEOS, data:res}
}

function gotAllPlaylistVideos(res){
    return {type: GET_ALL_PLAYLIST_VIDEOS, data:res}
}

function gotMovieList(res){
    return {type: GET_MOVIE_LIST, data: res}
}

function gotMoreMovieList(res){
    return {type: GET_MORE_MOVIE_LIST, data: res}
}


function gotMovieDetails(res){
    return {type: GET_MOVIE_DETAILS, data: res}
}

function gotMovieSuggestions(res){
    return {type: GET_MOVIE_SUGGESTIONS, data: res}
}

function clearVideos(){
    return {type: CLEAR_VIDEOS}
}

export function flushCurrentData(){
    return {type: FLUSH_CURRENT_DATA}
}

