import React from 'react'
import Tweet from './tweet'

export default class TweetList extends React.Component {
    constructor(...args) {
        super(...args);
        this.timelineStore = this.props.stores.homeTimelineStore;
        this.mentionsStore = this.props.stores.mentionsStore;
        this.dmStore = this.props.stores.directMessageStore;
        this.statusStore = this.props.stores.tweetListStatusStore;
        this.state = {}
    }

    componentDidMount() {
        this.statusStore.on("updated", () => {
            this.setState();
        });
        this.timelineStore.on("updated", () => {
            this.setState();
        });
        this.mentionsStore.on("updated", () => {
            this.setState();
        });
        this.dmStore.on("updated", () => {
            this.setState();
        });
    }

    getTweets() {
        if (this.statusStore.homeTimelineEnabled()) {
            return this.timelineStore.getVal().map((rawTweet) => {
                return <Tweet text={rawTweet.text} name={rawTweet.user.name} screenName={rawTweet.user.screen_name}/>;
            });
        } else if(this.statusStore.mentionEnabled()) {
            return this.mentionsStore.getVal().map((rawTweet) => {
                return <Tweet text={rawTweet.text} name={rawTweet.user.name} screenName={rawTweet.user.screen_name}/>;
            });
        } else if(this.statusStore.directMailEnabled()) {
            return this.dmStore.getVal().map((rawTweet) => {
                return <Tweet text={rawTweet.text} name={rawTweet.user.name} screenName={rawTweet.user.screen_name}/>;
            });
        }
    }

    render() {
        return (
            <div className="tweetList">
                {this.getTweets()}
            </div>
        );
    }
}
