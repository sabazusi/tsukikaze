import React from 'react'
import ReactDOM from 'react-dom'
import TweetList from './components/tweet-list'

export default class Renderer {
    render() {
        ReactDOM.render(<TweetList tweetList={["hoge", "huga", "piyo"]}/>, document.getElementById('main'));
    }
}
