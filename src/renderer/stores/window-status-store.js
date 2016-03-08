import ActionDispatcher from '../dispatcher/action-dispatcher';
import LocalStorageKeyConstants from './../../utils/constants/local-storage-key-constants';
import StoreBase from './store-base';
import WindowConstants from '../constants/window-constants';

export default class WindowStatusStore extends StoreBase {
    constructor() {
        super();
        this.width = window.outerWidth;
        this.height = window.outerHeight;
        this.save(this.width, this.height);

        ActionDispatcher.register((action) => {
            switch(action.actionType) {
                case WindowConstants.SIZE_CHANGED:
                    this.width = window.innerWidth;
                    this.height = window.innerHeight;
                    this.save(action.width, action.height);
                    this.emitChange();
                    break;

                default:
                    break;
            }
        });
    }

    save(width, height) {
        let newWindowSize = {width: width, height: height};
        localStorage.setItem(
            LocalStorageKeyConstants.INITIAL_WINDOW_SIZE, JSON.stringify(newWindowSize)
        );
    }

    getTweetListMaxHeight() {
        return this.height - 83;
    }

    getWindowSize() {
        return {
            width: this.width,
            height: this.height
        };
    }
}
