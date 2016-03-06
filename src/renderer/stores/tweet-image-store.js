import ActionDispatcher from '../dispatcher/action-dispatcher';
import StoreBase from './store-base';
import TweetImageConstants from '../constants/tweet-image-constants';

export default class TweetImageStore extends StoreBase {
    constructor() {
        super();

        this._reset();

        ActionDispatcher.register((action) => {
            switch(action.actionType) {
                case TweetImageConstants.OPEN_IMAGE:
                    this._imageModalEnabled = true;
                    this.images = action.images;
                    this.currentIndex = action.index;
                    this.emitChange();
                    break;

                case TweetImageConstants.CLOSE_IMAGE:
                    this._reset();
                    this.emitChange();
                    break;

                case TweetImageConstants.TRANSITION_FORWARD:
                    if (this.transitionForwardEnabled()) {
                        this.currentIndex++;
                    }
                    this.emitChange();
                    break;

                case TweetImageConstants.TRANSITION_BACKWARD:
                    if (this.transitionBackwardEnabled()) {
                        this.currentIndex--;
                    }
                    this.emitChange();
                    break;

                default:
                    break;
            }
        });
    }

    _reset() {
        this.images = [];
        this.currentIndex = -1;
        this._imageModalEnabled = false;
    }

    imageModalEnabled() {
        return this._imageModalEnabled &&
            this.currentIndex > -1 &&
            this.images.length > 0;
    }

    currentImage() {
        return this.imageModalEnabled() ?
            this.images[this.currentIndex] : {};
    }

    transitionForwardEnabled() {
        return this.imageModalEnabled() &&
            this.currentIndex > 0;
    }

    transitionBackwardEnabled() {
        return this.imageModalEnabled() &&
            this.currentIndex < this.images.length - 1;
    }
}