export const API_URL = 'http://youtubedltest0.herokuapp.com/api/info?url=https://www.youtube.com/watch?v=';
//export const API_URL = 'http://omgyoutube.herokuapp.com/api/info?url=https://www.youtube.com/watch?v=';
export const API_KEY = 'AIzaSyArwuhcNmt0NAixnehN_SqEVoqQmQTEWus';
export const API_KEY1 = 'AIzaSyCaskXcV-afNC59qRS9zAhpCTwPXAKkt2A';
export const API_KEY2 = 'AIzaSyA0X0V73UFA60686q7MLWnxzhtMvC1xlJs';
//export const SERVER_URL = 'http://localhost/omgyoutube';
export const SERVER_URL = 'http://omgyoutube.com';
export const YTS_LIST ='https://yts.ag/api/v2/list_movies.json';

export const PLAYLISTS = [
    {name: 'cute', id: 'PLlpHoeIVvNBuDXXZa3CProSz4DEd3Y67H'},
    {name: 'omg', id: 'PLlpHoeIVvNBtc4qWrA2vaNOVAym-yizu9'},
    {name: 'doityourself', id:'PLlpHoeIVvNBvin5-E-WiBKQRSAMK10Hbx'},
    {name: 'funny', id: 'PLlpHoeIVvNBs_B2VTjFaL0cdjyOMTU6X9'},
    {name: 'nsfw', id: 'PLlpHoeIVvNBs2pYb5B5v107rj79Hn31Kl'},
    {name: 'fail', id: 'PLlpHoeIVvNBtIKGBad4ZR_IuAWwjY8UV-'},
    {name: 'disgusting', id: 'PLlpHoeIVvNBtJonjUfNnAVyfLyUx40Qih'},
    {name: 'amazing', id: 'PLlpHoeIVvNBsuOglYFs08BrmUlfjNYFFA'},
    {name: 'live', id: 'PLfEUZOZE05jB9ZAGcV_2Eos_EgbN7kPwc'}
];

export const Collections = {
    "Music":[
        {name:"Nepali", slug:"nepali", id: "PLlpHoeIVvNBtL9zFVeX8fbtt2KKJJaVj0"},
        {name:"Hindi", slug:"hindi", id: "PLlpHoeIVvNBvkxyYwKPL5Ij3QOl5wxDML"},
        {name:"English", slug:"english", id: "PLlpHoeIVvNBt-EETh_yuZtx5PAhmV3UQC"},
        {name:"Lok Dohori", slug:"lok-dohori", id: "PLlpHoeIVvNBsly7cR-k2YViDmMy3JAb2Z"}
        ],
    "Movies":[
        {name: "Nepali", slug:"nepali", id: "PLlpHoeIVvNBsXjMWg8bmke44BE651-IOY"},
        {name: "Hindi", slug:"hindi", id: "PLlpHoeIVvNBtQ017W6ZfQAgsXcY-f12dC"},
        {name: "English", slug:"english", id: "PLlpHoeIVvNBuRfCB2gbzYkPW5Iy03PCKW"},
        {name: "South Indian", slug:"south-indian", id: "PLlpHoeIVvNBt9jwcvKQPY4w0yuorcQlbo"}
    ],
    "TV-Series":[
        {name: "Bhadragol", slug:"bhadragol", id:"PL5IdznwvT_07yiUGA2964s0bRSAGfvnbD"},
        {name: "Bachelors", slug:"bachelors", id:"PLTB0eCoUXErYP_eXc3do0K4dIMUR3XwMG"},
        {name: "Tripling", slug:"tripling", id:"PLTB0eCoUXEraZe3d7fJRdB-znE5D0cMZ7"},
        {name: "Little Things", slug:"little-things", id:"PL4x7Of-X4XhgNBVfFpd1N4cSU_X1x96gU"},
        {name: "What The Flop", slug:"what-the-flop", id:"PLwUmS78P9jN2rLrgfiMUPIJjZL0kukfo-"},
        {name: "Permanent Roommates", slug:"permanent-roommates", id:"PLTB0eCoUXErZe2pMrH3qO4tHtw-K0QKb_"}
    ]
};

export const GET_VIDEO_DATA = 'GET_VIDEO_DATA';
export const GET_CHANNEL_VIDEOS = 'GET_CHANNEL_VIDEOS';
export const GET_RELATED_VIDEOS = 'GET_RELATED_VIDEOS';
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const GET_SEARCH_QUERY = 'GET_SEARCH_QUERY';
export const SAVE_QUERY = 'SAVE_QUERY';
export const GET_MORE_VIDEOS = 'GET_MORE_VIDEOS';
export const FLUSH_CURRENT_DATA = 'FLUSH_CURRENT_DATA';
export const GET_ALL_CHANNEL_VIDEOS = 'GET_ALL_CHANNEL_VIDEOS';
export const GET_PLAYLIST_VIDEOS = 'GET_PLAYLIST_VIDEOS';
export const GET_ALL_PLAYLIST_VIDEOS = 'GET_ALL_PLAYLIST_VIDEOS';
export const CLEAR_VIDEOS = 'CLEAR_VIDEOS';
export const CLEAR_CHANNEL_VIDEOS = 'CLEAR_CHANNEL_VIDEOS';
export const GET_MOVIE_LIST = 'GET_MOVIE_LIST';
export const GET_MORE_MOVIE_LIST = 'GET_MORE_MOVIE_LIST';
export const GET_MOVIE_DETAILS = 'GET_MOVIE_DETAILS';
export const GET_MOVIE_SUGGESTIONS = 'GET_MOVIE_SUGGESTIONS';