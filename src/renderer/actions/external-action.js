import ViewDispatcher from '../dispatcher/view-dispatcher';
import TweetBodyConstants from '../constants/tweet-body-constants';
import Shell from 'shell';

export default class ExternalAction {
    constructor() {
        ViewDispatcher.register((action) => {
            switch(action.actionType) {
                case TweetBodyConstants.OPEN_LINK:
                    Shell.openExternal(action.url);
                    break;

                default:
                    break;
            }
        });
    }
}
