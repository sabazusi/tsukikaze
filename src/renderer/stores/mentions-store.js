import StoreBase from './store-base';
import ActionDispatcher from '../dispatcher/action-dispatcher';
import TwitterClientConstants from '../constants/twitter-client-constants';

export default class MentionsStore extends StoreBase {
    constructor() {
        super();
        this.mentions = [];
        ActionDispatcher.register((action) => {
            switch(action.actionType) {
                case TwitterClientConstants.MENTION:
                    action.mentions.map((mention) => {
                        this.mentions.push(mention);
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
