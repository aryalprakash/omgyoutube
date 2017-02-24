import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'
import Main from './src/Components/Main';
import App from './src/Components/App';
import Home from './src/Components/Home';
import Watch from './src/Components/Watch';
import Search from './src/Components/Search';
import Channel from './src/Components/Channel.js'
import Playlist from './src/Components/Playlist.js'
import PlayMenu from './src/Components/PlayMenu.js'
import Youtube from './src/reducers/reducer.js';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, hashHistory, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'
import thunk from 'redux-thunk'
import Helmet from "react-helmet";


//require("./css/style.css");
const store = createStore(
    Youtube,
    applyMiddleware(thunk)
);

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

let routes =(
    <Provider store={store}>
        <div className="main">
            <div className="header">
            </div>
            <div className="center">
                <div className="">
                match({ history, routes }, (error, redirectLocation, renderProps) => {
                    render(<Router {...renderProps}>
                        <Route name="main" component={Main}>
                            <Route path="/" component={App} />
                            <Route path="/watch/v=:videoID" component={Watch}/>
                            <Route path="/search/:query" component={Search}/>
                            <Route path="/channel/:channel/:type" component={Channel}/>
                            <Route path="/playlist/:playlist" component={Playlist}/>
                            <Route name="playmenu" path="/playmenu" component={PlayMenu}/>
                            <Route path="*" component={Home}/>
                        </Route>
                    </Router>
                    , mountNode)
                    })
                </div>
            </div>
            <div className="footer">
                <div className="footer-content">Made with <a href="/#/search/love">{'<'}3</a> in <a className="channel-link" href="/#/search/Nepal">Nepal</a></div>
                <div className="social-links">
                    <a href="https://facebook.com/OMGYoutubeApp" target="_blank" title="Like us on Facebook"><div className="social facebook"><img src="../img/facebook.png" width="100%" /></div></a>
                    <a href="https://twitter.com/OMGYoutubeApp" target="_blank" title="Follow us on Twitter"> <div className="social twitter"><img src="../img/twitter.png" width="100%" /></div></a>
                </div>
            </div>
        </div>
    </Provider>);

export default routes;

//ReactDOM.render(<App />, document.getElementById('root'));
