import ipc from 'ipc'
import ApplicationInitializer from './initializer'
import TwitterClient from './actions/clients/twitter-client'
import Renderer from './renderer'


setTimeout(() => {
    Renderer.renderPreload();
}, 100);

const initialize = (aToken, aSecret, cKey, cSecret) => {
    new ApplicationInitializer().run( new TwitterClient(
        aToken,
        aSecret,
        cKey,
        cSecret
    ));
};


let loginKeys = JSON.parse(localStorage.getItem('twitter-login-keys'));

if (loginKeys) {
    ipc.on('consumer-keys', (credential) => {
        initialize(
            loginKeys.accessToken,
            loginKeys.accessTokenSecret,
            credential.consumerKey,
            credential.consumerSecret
        );
    });
    ipc.send('require-consumer-keys', loginKeys.accessToken, loginKeys.accessTokenSecret);

} else {

    ipc.on('consumer-and-access-keys', (accessToken, accessTokenSecret, credential) => {
        let newKey = JSON.stringify({
            accessToken: accessToken,
            accessTokenSecret: accessTokenSecret
        });
        localStorage.setItem('twitter-login-keys', newKey);

        initialize(
            accessToken,
            accessTokenSecret,
            credential.consumerKey,
            credential.consumerSecret
        );
    });
    ipc.send('authenticate-twitter');
}
