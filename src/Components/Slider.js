import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class Slider extends Component {
    render(){
        return(<div className="slider-container">
            <div className="slider-contents">
            <div className="slider-left">
                <div className="slider-big-title">
                    Watch and Download Youtube Videos
                </div>
                <div className="slider-points">
                    <div id="point1">* Works on Web and Mobile.</div>
                    <div id="point2">* Download in MP3 or MP4 format.</div>
                    <div className="sub-point">- Copy and paste Youtube URL on search box.</div>
                    <div className="sub-point">- Or add 'omg' before youtube on Youtube URL.</div>
                 </div>
            </div>
            <div className="slider-right">
                <img src='/img/slider.png' width="95%" />
            </div>
            </div>
        </div>)
    }
}