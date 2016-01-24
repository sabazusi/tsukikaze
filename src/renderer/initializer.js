import ipc from 'ipc';
import IpcConstants from './../utils/constants/ipc-constants';
import StorageKeyConstants from './../utils/constants/storage-key-constants';

let loginKeys = JSON.parse(localStorage.getItem('twitter-login-keys'));
let windowSize = JSON.parse(localStorage.getItem('window-size'));

// listenr from main process.
ipc.on(IpcConstants.UPDATE_LOGIN_KEYS, (accessToken, accessTokenSecret) => {
    let newLoginKeys = JSON.stringify({
        accessToken: accessToken,
        accessTokenSecret: accessTokenSecret
    });
    localStorage.setItem(StorageKeyConstants.TWITTER_LOGIN_KEYS, newLoginKeys);
});

ipc.on(IpcConstants.UPDATE_WINDOW_SIZE, (newWindowSize) => {
    localStorage.setItem(StorageKeyConstants.INITIAL_WINDOW_SIZE, newWindowSize);
});

ipc.on(IpcConstants.UPDATE_MESSAGE, (newMessage) => {
});


// send message to main process.
if (loginKeys) {
    ipc.send(IpcConstants.INITIALIZE_WITH_KEY, loginKeys, windowSize);
} else {
    ipc.send(IpcConstants.INITIALIZE_WITH_LOGIN, windowSize);
}
