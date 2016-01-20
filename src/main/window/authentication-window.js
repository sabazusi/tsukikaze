import { EventEmitter } from 'events'
import electronWindow from 'electron-window'
import TwitterAPI from 'node-twitter-api'
import TwitterAuthConstants from '../../utils/twitter-auth-constants';

export default class AuthenticationWindow extends EventEmitter
{
    constructor() {
        super();
        const windowProperty = {
            width: 400,
            height: 500,
            frame: false,
            resizable: false,
            'node-integration' : false,
            'always-on-top': true
        };

        this._window = electronWindow.createWindow(windowProperty);
    }

    show (credential) {
        let twitterAPI = new TwitterAPI({
            consumerKey: credential.consumerKey,
            consumerSecret: credential.consumerSecret,
            callback: credential.callback
        });

        twitterAPI.getRequestToken((error, requestToken, requestTokenSecret) => {
            this._window.webContents.on('will-navigate', (event, url) => {
                let matched;
                if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
                    twitterAPI.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
                        // get access token.
                        this.emit(TwitterAuthConstants.GET_ACCESS_TOKEN, accessToken, accessTokenSecret);
                    });
                    event.preventDefault();
                    setImmediate( () => {
                        this._window.close();
                    });
                }
            });

            let url = twitterAPI.getAuthUrl(requestToken) + '&force_login=true';
            this._window.showUrl(url);
        });
    }
}
