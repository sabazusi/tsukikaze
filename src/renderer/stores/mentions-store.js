import EventEmitter from 'events'
import ActionDispatcher from '../dispatcher/action-dispatcher'

export default class MentionsStore extends EventEmitter {
    constructor() {
        super();
        this.mentions = [];
        ActionDispatcher.register((action) => {
            switch(action.actionType) {
                case "mentions":
                    console.log(action.mentions);
                        this.mentions.push(tweet);
                    });
                    this.emit("updated");
                    break;
                default:
                    break;
            }
        });
    }

    getVal() {
        return this.mentions;
    }
}