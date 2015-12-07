import ActionDispatcher from '../dispatcher/action-dispatcher'
import ViewDispatcher from '../dispatcher/view-dispatcher'
import EditorConstants from '../constants/editor-constants'
import TweetOptionConstants from '../constants/tweet-option-constants'

export default class EditorAction {
    constructor() {
        ViewDispatcher.register((action) => {
            switch(action.actionType) {
                case EditorConstants.OPEN_EDITOR:
                case EditorConstants.CLOSE_EDITOR:
                case EditorConstants.POST_TWEET:
                case EditorConstants.CHANGE_TEXTAREA:
                case TweetOptionConstants.OPEN_MENTION:
                case TweetOptionConstants.OPEN_DM:
                    ActionDispatcher.dispatch(action);
                    break;

                default:
                    break;
            }
        });
    }
}
