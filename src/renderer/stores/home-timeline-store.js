import TwitterClientConstants from '../constants/twitter-client-constants'
import Dispatcher from '../dispatcher/action-dispatcher'
import StoreBase from './store-base'

export default class TwitterHomeTimelineStore extends StoreBase {
    constructor() {
        super();
        this.homeTimelineTweets = [];
        Dispatcher.register((action) => {
            switch(action.actionType) {
                case TwitterClientConstants.INITIAL_TWEET:
                    action.tweets.map((tweet) => {
                        tweet.selected = false;
                        this.homeTimelineTweets.push(tweet);
                    });
                    this.emitChange();
                    break;

                case TwitterClientConstants.USER_STREAM_TWEET:
                    this.homeTimelineTweets.unshift(action.tweet);
                    this.emitChange();
                    break;
            }
        });
    }

    getVal() {
        return this.homeTimelineTweets;
    }
}
