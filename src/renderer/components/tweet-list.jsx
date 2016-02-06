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
        this.statusStore.onChange(() => {
            this.forceUpdate();
        });
        this.timelineStore.onChange(() => {
            this.forceUpdate();
        });
        this.mentionsStore.onChange(() => {
            this.forceUpdate();
        });
        this.dmStore.onChange(() => {
            this.forceUpdate();
        });
    }

    getTweets() {
        if (!this.timelineStore.hasInitialized()) {
            return (
                <div>
                    <div className="preLoading">
                        <img src="../../resources/loading.gif"/>
                    </div>
                    <div className="dummyTweetList">
                        <div className="dummyTweet">
                        </div>
                    </div>
                </div>
            );
        } else if (this.statusStore.homeTimelineEnabled()) {
            return this.timelineStore.getVal().map((rawTweet) => {
                return <Tweet key={rawTweet.id} tweet={rawTweet} name={rawTweet.user.name} screenName={rawTweet.user.screen_name}/>;
            });
        } else if(this.statusStore.mentionEnabled()) {
            return this.mentionsStore.getVal().map((rawTweet) => {
                return <Tweet key={rawTweet.id} tweet={rawTweet} name={rawTweet.user.name} screenName={rawTweet.user.screen_name}/>;
            });
        } else if(this.statusStore.directMessageEnabled()) {
            return this.dmStore.getVal().map((rawTweet) => {
                return <Tweet key={rawTweet.id} tweet={rawTweet} name={rawTweet.sender.name} screenName={rawTweet.sender.screen_name}/>;
            });
        }
    }

    render() {
        let style = {};
        style["maxHeight"] = this.props.maxHeight;
        return (
            <div className="tweetList" style={style}>
                {this.getTweets()}
            </div>
        );
    }
}
