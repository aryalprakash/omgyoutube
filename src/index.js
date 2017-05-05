import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'
import Main from './Components/Main';
import App from './Components/App';
import Home from './Components/Home';
import Watch from './Components/Watch';
import Movie from './Components/Movie';
import MovieTorrents from './Components/MovieTorrents';
import Search from './Components/Search';
import Channel from './Components/Channel.js'
import Playlist from './Components/Playlist.js'
import Collection from './Components/Collection.js'
import PlayMenu from './Components/PlayMenu.js'
import Youtube from './reducers/reducer.js';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, hashHistory, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'
import thunk from 'redux-thunk'
import Helmet from "react-helmet";


require("../css/style.css");
const store = createStore(
    Youtube,
    applyMiddleware(thunk)
);

//const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

render((
    <Provider store={store}>
    <div className="main">
        <div className="header">
        </div>
        <div className="center">
            <div className="">
                <Router history={browserHistory}>
                    <Route name="main" component={Main}>
                        <Route path="/" component={App} />
                        <Route path="/watch/v=:videoID" component={Watch}/>
                        <Route path="/movie/v=:videoID" component={Movie}/>
                        <Route path="/search/:query" component={Search}/>
                        <Route path="/movie-torrents" component={MovieTorrents}/>
                        <Route path="/channel/:channel/:type" component={Channel}/>
                        <Route path="/playlist/:playlist" component={Playlist}/>
                        <Route path="/collection/:collection/:playlist" component={Collection}/>
                        <Route name="playmenu" path="/playmenu" component={PlayMenu}/>
                        <Route path="*" component={Home}/>
                    </Route>
                </Router>
            </div>
        </div>
        <div className="footer">
        <div className="footer-content">Made with <a href="/#/search/love">{'<'}3</a> in <a className="channel-link" href="/#/search/Nepal">Nepal</a></div>
            <div className="social-links">
                <a href="https://facebook.com/OMGYoutubeApp" target="_blank" title="Like us on Facebook"><div className="social facebook"><img src="/img/facebook.png" width="100%" /></div></a>
                <a href="https://twitter.com/OMGYoutubeApp" target="_blank" title="Follow us on Twitter"> <div className="social twitter"><img src="/img/twitter.png" width="100%" /></div></a>
                <a href="https://instagram.com/OMGYoutubeApp" target="_blank" title="Follow us on Instagram"> <div className="social instagram"><img src="/img/instagram.png" width="100%" /></div></a>
            </div>
        </div>
    </div>
    </Provider>), document.getElementById('root'))

//ReactDOM.render(<App />, document.getElementById('root'));
