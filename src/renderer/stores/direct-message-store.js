import StoreBase from './store-base'
import ActionDispatcher from '../dispatcher/action-dispatcher'

export default class DirectMessageStore extends StoreBase {
    constructor() {
        super();
        this.dms = [];
        ActionDispatcher.register((action) => {
            switch(action.actionType) {
                case "directMessages":
                    action.dms.map((dm) => {
                        this.dms.push(dm);
                    });
                    this.emitChange();
                    break;

                default:
                    break;
            }
        });
    }

    getVal() {
        return this.dms;
    }
}
