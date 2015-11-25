import StoreBase from './store-base'
import ActionDispatcher from '../dispatcher/action-dispatcher'

export default class MentionsStore extends StoreBase {
    constructor() {
        super();
        this.mentions = [];
        ActionDispatcher.register((action) => {
            switch(action.actionType) {
                case "mentions":
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
