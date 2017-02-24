import thunk from 'redux-thunk'
import update from 'react-addons-update';

import {
    GET_VIDEO_DATA,
    GET_CHANNEL_VIDEOS,
    GET_RELATED_VIDEOS,
    GET_SEARCH_RESULTS,
    GET_SEARCH_QUERY,
    SAVE_QUERY,
    GET_MORE_VIDEOS,
    GET_ALL_CHANNEL_VIDEOS,
    GET_PLAYLIST_VIDEOS,
    GET_ALL_PLAYLIST_VIDEOS,
    GET_MOVIE_LIST,
    GET_MORE_MOVIE_LIST,
    GET_MOVIE_DETAILS,
    GET_MOVIE_SUGGESTIONS
    } from '../constants/ActionTypes.js';

const initialState = { channels: [], playlists: [], query: null}

const Youtube = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_VIDEO_DATA':
            return {
                ...state,
                vidinfo: action.data
            }

        case 'GET_CHANNEL_VIDEOS':

            return {
                    ...state,
                    channels:[
                        ...state.channels,
                        action.data
                        ]
                }

            case 'GET_PLAYLIST_VIDEOS':
            return {
                    ...state,
                    playlists:[
                                ...state.playlists,
                                action.data
                        ]
                }

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

        case 'GET_SEARCH_QUERY':
        return{
        ...state,
            searchQueries: action.data,
            select: action.select
        }

        case 'SAVE_QUERY':
        return{
            ...state,
            query: action.data
        }

        case 'GET_ALL_CHANNEL_VIDEOS':
        return{
            ...state,
            searchResults: action.data.items,
            token: action.data.nextPageToken
        }

        case 'GET_ALL_PLAYLIST_VIDEOS':
            return{
                ...state,
                searchResults: action.data.items,
                token: action.data.nextPageToken
            }

        case 'GET_MORE_VIDEOS':
            let abc = update(state.searchResults, {$push: action.data.items});
            return{
                ...state,
                searchResults: abc,
                token: action.data.nextPageToken
            }

        case 'GET_MOVIE_LIST':
        return{
            ...state,
            movies: action.data.data
        }

        case 'GET_MORE_MOVIE_LIST':
            let pushMovies = update(state.movies.movies, {$push: action.data.data.movies})
            action.data.data.movies = update(action.data.data.movies, {$set: pushMovies});
            return{
            ...state,
                loader: false,
                movies: action.data.data
            }

        case 'GET_MOVIE_DETAILS':
        return {
            ...state,
            movieDetails: action.data.data
        }

        case 'GET_MOVIE_SUGGESTIONS':
        return {
            ...state,
            movieSuggestions: action.data.data
        }

        case 'FLUSH_CURRENT_DATA':
            return{
                ...state,
                vidinfo: null,
                //searchQueries: null
                relatedVideos: null,
                movieDetails: null,
                movieSuggestions: null
            }
        case 'CLEAR_VIDEOS':
            return{
                ...state,
                searchResults: null,
                token: null
            }
        case 'CLEAR_CHANNEL_VIDEOS':
            return {
                ...state,
                channels: [],
                playlists: []
            }

        default:
            return state

    }
}

export default Youtube