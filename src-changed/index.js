import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'
//import App from './App';
//import Home from './Home';
//import Watch from './Watch';
//import Search from './Search';
//import Header from './Header.js'
//import Youtube from './reducers/reducer.js';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import thunk from 'redux-thunk'

require("../css/style.css");
import App from './containers/app';

const store = createStore(
    Youtube,
    applyMiddleware(thunk)
);

render((
    <Provider store={store}>
    <div className="main">
        <div className="header">
        </div>
        <div className="center">
            <div className="">
                <Router history={browserHistory}>
                    <Route path="/" component={App} >
                        //<Route path="/" component={Home} />
                        //<Route path="/app" component={App}/>
                        //<Route path="/watch/v=:videoID" component={Watch}/>
                        //<Route path="/search/:query" component={Search}/>
                        //<Route path="*" component={App}/>
                    </Route>
                </Router>
            </div>
        </div>
    </div>
    </Provider>), document.getElementById('root'))

//ReactDOM.render(<App />, document.getElementById('root'));
