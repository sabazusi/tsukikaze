import ActionDispatcher from '../dispatcher/action-dispatcher'
import LocalStorageKeyConstants from './../utils/constants/local-storage-key-constants';
import StoreBase from './store-base'
import WindowConstants from '../constants/window-constants';

export default class WindowStatusStore extends StoreBase {
    constructor() {
        super();
        this.width = window.outerWidth;
        this.height = window.outerHeight;

        ActionDispatcher.register((action) => {
            switch(action.actionType) {
                case WindowConstants.SIZE_CHANGED:
                    this.width = action.width;
                    this.height = action.height;
                    this.save(action.width, action.height);
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
}
