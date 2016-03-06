import React from 'react'
import Tweet from './tweet/tweet'

export default class TweetList extends React.Component {
    constructor(...args) {
        super(...args);
        this.timelineStore = this.props.stores.homeTimelineStore;
        this.mentionsStore = this.props.stores.mentionsStore;
        this.dmStore = this.props.stores.directMessageStore;
        this.tweetStatusStore = this.props.stores.tweetListStatusStore;
        this.windowStatusStore = this.props.stores.windowStatusStore;
        this.tweetImageStore = this.props.stores.tweetImageStore;
        this.state = {}
    }

    componentDidMount() {
        this.tweetStatusStore.onChange(() => {
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
        this.windowStatusStore.onChange(() => {
            this.forceUpdate();
        });
        this.tweetImageStore.onChange(() => {
            this.forceUpdate();
        });
    }

    getTweets() {
        if (this.tweetStatusStore.homeTimelineEnabled()) {
            return this.timelineStore.getVal().map((rawTweet) => {
                return <Tweet key={"tl" + rawTweet.id_str} tweet={rawTweet} name={rawTweet.user.name} screenName={rawTweet.user.screen_name}/>;
            });
        } else if(this.tweetStatusStore.mentionEnabled()) {
            return this.mentionsStore.getVal().map((rawTweet) => {
                return <Tweet key={"mention"+rawTweet.id_str} tweet={rawTweet} name={rawTweet.user.name} screenName={rawTweet.user.screen_name}/>;
            });
        } else if(this.tweetStatusStore.directMessageEnabled()) {
            return this.dmStore.getVal().map((rawTweet) => {
                return <Tweet key={"dm"+rawTweet.id_str} tweet={rawTweet} name={rawTweet.sender.name} screenName={rawTweet.sender.screen_name}/>;
            });
        }
    }


    getDummyTweets() {
        return (
            <div>
                <div className="preLoading">
                    <div className="cssload-loader"></div>
                </div>
                <div className="dummyTweetList">
                    <div className="dummyTweet">
                    </div>
                </div>
            </div>
        );
    }

    getOverlayContents() {
    }


    render() {
        let style = {};
        style["maxHeight"] = this.windowStatusStore.getTweetListMaxHeight();
        if (!this.timelineStore.hasInitialized()) {
            return (
                <div>
                    {this.getDummyTweets()}
                </div>
            );
        } else {
            return (
                <div className="tweetList" style={style}>
                    {this.getTweets()}
                    {this.getOverlayContents()}
                </div>
            );
        }
    }
}
