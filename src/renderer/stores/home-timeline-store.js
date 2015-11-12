import Dispatcher from '../dispatcher/action-dispatcher'
import EventEmitter from 'events'

export default class TwitterHomeTimelineStore extends EventEmitter {
    constructor() {
        super();
        Dispatcher.register((action) => {
            switch(action.actionType) {
                case "initialTweet":
                      this.tweets = action.tweets;
                      this.emit("updated", this.tweets);
                      break;
                case "userStreamTweet":
                      break;
            }
        });
    }

    getVal() {
        return "hoeee";
    }
}
