import ActionDispatcher from '../dispatcher/action-dispatcher';
import StoreBase from './store-base';
import TweetImageConstants from '../constants/tweet-image-constants';

export default class TweetImageStore extends StoreBase {
    constructor() {
        super();

        this._imageModalEnabled = false;

        ActionDispatcher.register((action) => {
            switch(action) {
                case TweetImageConstants.OPEN_IMAGE:
                    this._imageModalEnabled = true;
                    this.emitChange();
                    break;

                case TweetImageConstants.CLOSE_IMAGE:
                    this._imageModalEnabled = false;
                    this.emitChange();
                    break;

                default:
                    break;
            }

        });
    }

    imageModalEnabled() {
        return this._imageModalEnabled;
    }

    currentImage() {
    }

    transitionForwardEnabled() {
    }

    transitionBackwardEnabled() {
    }
}