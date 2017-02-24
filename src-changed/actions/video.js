'use strict'
import thunk from 'redux-thunk'
import { dispatch } from 'redux'

import {
    GET_VIDEO_DATA,
    API_URL,
    API_KEY,
    GET_CHANNEL_VIDEOS,
    GET_RELATED_VIDEOS,
    GET_SEARCH_RESULTS,
    GET_MORE_VIDEOS
    } from '../constants/ActionTypes.js';

export function getVideoData (videoID) {

    return function (dispatch) {
        var myHeaders = new Headers();
        var myInit = { method: 'GET',
            headers: myHeaders,
            mode: 'no-cors',
            cache: 'default'
        };

        const url = API_URL+videoID;
        fetch(url).then(response => response.json()).then(res => {
            dispatch(gotVideoData(res));
        })
    }
}

export function getChannelVideos (channelId){
    return function(dispatch){
        const url = 'https://www.googleapis.com/youtube/v3/search?key='+API_KEY+'&channelId='+channelId+'&part=snippet,id&order=relevance&maxResults=9'
        fetch(url).then(response => response.json()).then(res => {
            dispatch(gotChannelVideos(res));
            //console.log(res);
        })
    }
}

export function getRelatedVideos(videoId){
    return function(dispatch){
        const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId='+videoId+'&type=video&key='+API_KEY+'&maxResults=10'
        fetch(url).then(response => response.json()).then(res =>{
            dispatch(gotRelatedVideos(res))
        })
    }
}

export function searchVideo(query, token){
    return function(dispatch){
        let url;
        if(token){
             url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&pageToken='+token+'&q='+query+'&type=video&key='+API_KEY+'&maxResults=10';
        }else{
             url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+query+'&type=video&key='+API_KEY+'&maxResults=10';
        }
        fetch(url).then(response => response.json()).then(res =>{
            dispatch(gotSearchResults(res))
        })
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

function gotMoreVideos(res){
    return {type: GET_MORE_VIDEOS, data: res}
}

