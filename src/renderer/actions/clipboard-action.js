import ActionDispatcher from '../dispatcher/action-dispatcher';
import ContextMenuConstants from '../constants/contextmenu-constants';

export default class ClipboardAction {
    constructor() {
        ActionDispatcher.register((action) => {
            switch(action.actionType) {
                case ContextMenuConstants.COPY_TEXT:
                    break;
                default:
                    break;
            }
        });
    }
}