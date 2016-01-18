import ipc from 'ipc';
import IpcConstants from './../utils/ipc-constants';

let loginKeys = JSON.parse(localStorage.getItem('twitter-login-keys'));
let windowSize = JSON.parse(localStorage.getItem('window-size'));

ipc.on(IpcConstants.UPDATE_LOGIN_KEYS, (accessToken, accessTokenSecret) => {
    let newLoginKeys = JSON.stringify({
        accessToken: accessToken,
        accessTokenSecret: accessTokenSecret
    });
    localStorage.setItem('twitter-login-keys', newLoginKeys);
});
ipc.on(IpcConstants.UPDATE_WINDOW_SIZE, (newWindowSize) => {
    localStorage.setItem('window-size', newWindowSize);
});

if (loginKeys) {
    ipc.send(IpcConstants.INITIALIZE_WITH_KEY, loginKeys, windowSize);
} else {
    ipc.send(IpcConstants.INITIALIZE_WITH_LOGIN, windowSize);
}
