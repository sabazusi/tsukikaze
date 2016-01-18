import jsonLoader from 'jsonloader';
import path from 'path';
import MainWindow from './window/main-window.js';
import AuthenticationWindow from './window/authentication-window.js';
import app from 'app';
import ipc from 'ipc';
import IpcConstants from '../utils/ipc-constants';
import InitialWindow from './window/initial-window';

export default class MainApplication
{
    constructor() {
        this.window = null;
    }

    start() {
        app.on('ready', this._onReady.bind(this));
        ipc.on(IpcConstants.INITIALIZE_WITH_LOGIN, (event, windowSize) => {
            this._startAuthentication(windowSize);
        });
        ipc.on(IpcConstants.INITIALIZE_WITH_KEY, (event, loginKeys, windowSize) => {
            this._checkLoginKeys(loginKeys, windowSize);
        });
    }

    _onReady() {
        this._loadCredential();
        this.initialWindow = new InitialWindow();
    }

    _startAuthentication(windowSize) {
        console.log(this._credential);
        setTimeout(() => {
            this.authenticationWindow = new AuthenticationWindow();
            this.authenticationWindow.on('get-access-token', (accessToken, accessTokenSecret) => {
                this.initialWindow.send(IpcConstants.UPDATE_LOGIN_KEYS, accessToken, accessTokenSecret);
            });
            this.authenticationWindow.show(this._credential)
        }, 1000);
    }

    _checkLoginKeys(keys, windowSize) {
        console.log("aa");
    }

    _loadCredential() {
        let credentialFilePath = path.resolve(__dirname, '../../', 'resources', 'authentication', 'twitter-credential.json');
        let credential = new jsonLoader(credentialFilePath);
        this._credential = {consumerKey: credential.consumerKey, consumerSecret: credential.consumerSecret, callback:credential.callback};
    }

    _authentication() {
        console.log('authentication start.');
        let credential = this._credential;
        let mainWindow = this.mainWindow;

        setTimeout(() => {
            this.authenticationWindow = new AuthenticationWindow();
            this.authenticationWindow.on('get-access-token', (accessToken, accessTokenSecret) => {
                mainWindow.send('consumer-and-access-keys', accessToken, accessTokenSecret, credential);
            });
            this.authenticationWindow.show(credential);
        }, 1000);

    }

    _sendConsumerKeys(e) {
        this.mainWindow.send('consumer-keys', this._credential);
    }
}
