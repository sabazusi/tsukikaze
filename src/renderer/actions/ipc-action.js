import ActionDispatcher from '../dispatcher/action-dispatcher';
import ipc from 'ipc';
import IpcConstants from '../../utils/constants/ipc-constants';
import WindowConstants from '../constants/window-constants';

export default class IpcAction {
    constructor() {
        ipc.on(IpcConstants.UPDATE_WINDOW_SIZE, (width, height) => {
            ActionDispatcher.dispatch({
                actionType: WindowConstants.SIZE_CHANGED,
                width: width,
                height: height
            });
        });
    }
}
