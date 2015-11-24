import StoreBase from './store-base'
import ActionDispatcher from '../dispatcher/action-dispatcher'

export default class MentionsStore extends StoreBase {
    constructor() {
        super();
        this.mentions = [];
        ActionDispatcher.register((action) => {
            switch(action.actionType) {
                case "mentions":
                    console.log(action.mentions);
                        this.mentions.push(tweet);
                    });
                    this.emitChange();
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