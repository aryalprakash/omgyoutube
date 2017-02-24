import thunk from 'redux-thunk'
import update from 'react-addons-update';

import {
    GET_VIDEO_DATA,
    GET_CHANNEL_VIDEOS,
    GET_RELATED_VIDEOS,
    GET_SEARCH_RESULTS,
    GET_MORE_VIDEOS
    } from '../constants/ActionTypes.js';

const initialState = []

const Youtube = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_VIDEO_DATA':
            return {
                ...state,
                vidinfo: action.data
            }

        case 'GET_CHANNEL_VIDEOS':
            return [
                ...state,
                action.data
            ]

        case 'GET_RELATED_VIDEOS':
            return {
                ...state,
                relatedVideos: action.data
            }

        case 'GET_SEARCH_RESULTS':
            return{
                ...state,
                searchResults: action.data.items,
                token: action.data.nextPageToken
            }

        case 'GET_MORE_VIDEOS':
            let abc = update(state.searchResults, {$push: action.data.items});
            console.log(abc);
            return{
                ...state,
                searchResults: abc,
                token: action.data.nextPageToken
            }

        default:
            return state

    }
}

export default Youtube