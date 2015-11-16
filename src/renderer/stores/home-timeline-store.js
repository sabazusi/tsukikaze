import TwitterClientConstants from '../constants/twitter-client-constants'
import Dispatcher from '../dispatcher/action-dispatcher'
import EventEmitter from 'events'

export default class TwitterHomeTimelineStore extends EventEmitter {
    constructor() {
        super();
        this.homeTimelineTweets = [];
        Dispatcher.register((action) => {
            switch(action.actionType) {
                case TwitterClientConstants.INITIAL_TWEET:
                      action.tweets.map((tweet) => {
                          this.homeTimelineTweets.push(tweet);
                      });
                      this.emit("updated");
                      break;

                case TwitterClientConstants.USER_STREAM_TWEET:
                      this.homeTimelineTweets.unshift(action.tweet);
                      this.emit("updated");
                      break;
            }
        });
    }

    getVal() {
        return this.homeTimelineTweets;
    }
}
