import { EventEmitter } from 'events'
import electronWindow from 'electron-window'
import TwitterAPI from 'node-twitter-api'

export default class AuthenticationWindow extends EventEmitter
{
    constructor() {
        super();
        const windowProperty = 
        {
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
                event.preventDefault();
                var matched;
                if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/))
                {
                    twitterAPI.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
                        // get access token.
                        this.emit('get-access-token', accessToken, accessTokenSecret);
                    });
                }
            });

            let url = twitterAPI.getAuthUrl(requestToken) + '&force_login=true';
            this._window.showUrl(url);
        });
    }
}
