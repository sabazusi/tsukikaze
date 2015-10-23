import jsonLoader from 'jsonloader'
import path from 'path'
import MainWindow from './window/main-window.js'
import AuthenticationWindow from './window/authentication-window.js'
import app from 'app'
import ipc from 'ipc'

export default class MainApplication
{
    constructor() {
        this.window = null;
    }

    start() {
        ipc.on('log', this._log);
        ipc.on('authenticate-twitter', this._authentication.bind(this));
        ipc.on('login-twitter', this._login.bind(this));
        app.on('ready', this._onReady.bind(this));
    }

    _onReady() {
        this._loadCredential();
        this.mainWindow = new MainWindow();
    }

    _loadCredential() {
        let credentialFilePath = path.resolve(__dirname, '../../', 'resources', 'authentication', 'twitter-credential.json');
        let credential = new jsonLoader(credentialFilePath);
        this._credential = {consumerKey: credential.consumerKey, consumerSecret: credential.consumerSecret, callback:credential.callback};
    }

    _authentication() {
        console.log('authentication start.');
        let credential = this._credential;
        let callback = this._login;

        setTimeout(function(){
            this.authenticationWindow = new AuthenticationWindow();
            this.authenticationWindow.on('get-access-token', callback);
            this.authenticationWindow.show(credential);
        }, 1000);

        this.mainWindow.send('login-succeeded');
    }

    _login(accessToken, accessTokenSecret) {
        console.log(accessToken);
        console.log(accessTokenSecret);
    }

    _log(event, args) {
        console.log("[Renderer]" + args);
    }
}
