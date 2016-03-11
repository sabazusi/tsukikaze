import ActionDispatcher from '../dispatcher/action-dispatcher';
import ViewDispatcher from '../dispatcher/view-dispatcher';
import TweetImageConstants from '../constants/tweet-image-constants';

export default class TweetImageAction {
    constructor() {
        ViewDispatcher.register((action) => {
            switch(action.actionType) {
                case TweetImageConstants.OPEN_IMAGE:
                case TweetImageConstants.CLOSE_IMAGE:
                case TweetImageConstants.TRANSITION_FORWARD:
                case TweetImageConstants.TRANSITION_BACKWARD:
                    ActionDispatcher.dispatch(action);
                    break;

                default:
                    break;
            }
        });
    }
}