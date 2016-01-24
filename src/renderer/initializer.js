import ipc from 'ipc';
import IpcConstants from './../utils/constants/ipc-constants';
import LocalStorageKeyConstants from './../utils/constants/local-storage-key-constants';

let loginKeys = JSON.parse(localStorage.getItem(LocalStorageKeyConstants.TWITTER_LOGIN_KEYS));
let windowSize = JSON.parse(localStorage.getItem(LocalStorageKeyConstants.INITIAL_WINDOW_SIZE));

// listenr from main process.
ipc.on(IpcConstants.UPDATE_LOGIN_KEYS, (accessToken, accessTokenSecret) => {
    let newLoginKeys = {accessToken: accessToken, accessTokenSecret: accessTokenSecret};
    localStorage.setItem(
        LocalStorageKeyConstants.TWITTER_LOGIN_KEYS, JSON.stringify(newLoginKeys)
    );
});

ipc.on(IpcConstants.UPDATE_WINDOW_SIZE, (width, height) => {
    let newWindowSize = {width: width, height: height};
    localStorage.setItem(
        LocalStorageKeyConstants.INITIAL_WINDOW_SIZE, JSON.stringify(newWindowSize)
    );
});

ipc.on(IpcConstants.UPDATE_MESSAGE, (newMessage) => {
});


// send message to main process.
if (loginKeys) {
    ipc.send(IpcConstants.INITIALIZE_WITH_KEY, loginKeys, windowSize);
} else {
    ipc.send(IpcConstants.INITIALIZE_WITH_LOGIN, windowSize);
}
