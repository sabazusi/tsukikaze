import React from 'react'
import ReactDOM from 'react-dom'
import TweetList from './components/tweet-list'

export default class Renderer {
    render(timelineStore) {
        ReactDOM.render(<TweetList tweetList={["hoge", "huga", "piyo"]} timelineStore={timelineStore}/>, document.getElementById('main'));
    }
}
