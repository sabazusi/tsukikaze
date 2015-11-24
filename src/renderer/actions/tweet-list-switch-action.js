import ActionDispatcher from '../dispatcher/action-dispatcher'
import ViewDispatcher from '../dispatcher/view-dispatcher'
import SwitcherConstants from '../constants/switcher-constants'

export default class TweetListSwitchAction {
    constructor() {
        ViewDispatcher.register((action) => {
            switch(action.actionType) {
                case SwitcherConstants.HOME_TIMELINE_SELECTED:
                case SwitcherConstants.MENTION_SELECTED:
                case SwitcherConstants.DIRECT_MESSAGE_SELECTED:
                    ActionDispatcher.dispatch(action);
                    break;

                default:
                    break;
            }
        });
    }
}