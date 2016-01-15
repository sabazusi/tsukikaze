import ipc from 'ipc';
import IpcConstants from './constants/ipc-constants';

let loginKeys = JSON.parse(localStorage.getItem('twitter-login-keys'));
let windowSize = JSON.parse(localStorage.getItem('window-size'));

if (loginKeys) {
    ipc.send(IpcConstants.INITIALIZE_WITH_KEY, loginKeys, windowSize);
} else {
    ipc.send(IpcConstants.INITIALIZE_WITH_LOGIN, windowSize);
}