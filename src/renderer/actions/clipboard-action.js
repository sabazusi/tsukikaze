import ActionDispatcher from '../dispatcher/action-dispatcher';
import ContextMenuConstants from '../constants/contextmenu-constants';
import clipboard from 'clipboard-js';

export default class ClipboardAction {
    constructor() {
        ActionDispatcher.register((action) => {
            switch(action.actionType) {
                case ContextMenuConstants.COPY_TEXT:
                    clipboard.copy(action.text);
                    break;
                default:
                    break;
            }
        });
    }
}
