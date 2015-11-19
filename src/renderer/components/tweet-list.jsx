import React from 'react'
import Tweet from './tweet'

export default class TweetList extends React.Component {
    constructor(...args) {
        super(...args);
        this.timelineStore = this.props.timelineStore;
        this.state = {
            rawTweets: this.timelineStore.getVal()
        }
    }

    componentDidMount() {
        this.timelineStore.on("updated", () => {
            this.setState({
                rawTweets: this.timelineStore.getVal()
            });
        });
    }

    getTweets() {
        return this.state.rawTweets.map((rawTweet) => {
            return <Tweet text={rawTweet.text} name={rawTweet.user.name} screenName={rawTweet.user.screen_name}/>;
        });
    }

    render() {
        return (
            <div className="tweetList">
                {this.getTweets()}
            </div>
        );
    }
}
