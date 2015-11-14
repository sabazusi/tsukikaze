import TwitterClientConstants from '../constants/twitter-client-constants'
import Dispatcher from '../dispatcher/action-dispatcher'
import EventEmitter from 'events'

export default class TwitterHomeTimelineStore extends EventEmitter {
    constructor() {
        super();
        Dispatcher.register((action) => {
            switch(action.actionType) {
                case TwitterClientConstants.INITIAL_TWEET:
                      this.tweets = action.tweets;
                      this.emit("updated", this.tweets);
                      break;
                case TwitterClientConstants.USER_STREAM_TWEET:
                      break;
            }
        });
    }

    getVal() {
        return "hoeee";
    }
}
