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
        ipc.on('login-twitter', this._loginTwitterWithSavedKey.bind(this));
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
        let callback = this._loginTwitter;
        let mainWindow = this.mainWindow;

        setTimeout(function(){
            this.authenticationWindow = new AuthenticationWindow();
            this.authenticationWindow.on('get-access-token', function(accessToken, accessTokenSecret){
                callback(mainWindow, accessToken, accessTokenSecret);
            });
            this.authenticationWindow.show(credential);
        }, 1000);

    }

    _loginTwitter(mainWindow, accessToken, accessTokenSecret) {
        mainWindow.send('login-succeeded', accessToken, accessTokenSecret);
    }

    _loginTwitterWithSavedKey(accessToken, accessTokenSecret) {
        this._loginTwitter(this.mainWindow, accessToken, accessTokenSecret);
    }

    _log(event, args) {
        console.log("[Renderer]" + args);
    }
}
