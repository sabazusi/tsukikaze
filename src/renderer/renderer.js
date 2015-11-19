import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import TweetList from './components/tweet-list'
import PreLoad from './components/pre-load'

export default class Renderer {
    render(stores) {
        ReactDOM.render(
            <Root stores={stores}/>, document.getElementById("postLoad")
        );
    }

    renderPreload() {
        ReactDOM.render(
            <PreLoad/>, document.getElementById("preLoad")
        );
    }
}
