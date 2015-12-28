import ipc from 'ipc'
import ApplicationInitializer from './initializer'
import TwitterClient from './actions/clients/twitter-client'
import Renderer from './renderer'


setTimeout(() => {
    Renderer.renderPreload();
}, 100);

let loginKeys = JSON.parse(localStorage.getItem('twitter-login-keys'));
if (loginKeys) {
    ipc.on('consumer-keys', (credential) => {
        new ApplicationInitializer().run( new TwitterClient(
            loginKeys.accessToken,
            loginKeys.accessTokenSecrent,
            credential.consumerKey,
            credential.consumerSecret
        ));
    });
    ipc.send('require-consumer-keys', loginKeys.accessToken, loginKeys.accessTokenSecrent);

} else {
    ipc.on('consumer-and-access-keys', (accessToken, accessTokenSecrent, credential) => {
        let newKey = JSON.stringify({
            accessToken: accessToken,
            accessTokenSecrent: accessTokenSecrent
        });
        localStorage.setItem('twitter-login-keys', newKey);

        new ApplicationInitializer().run( new TwitterClient(
            accessToken,
            accessTokenSecrent,
            credential.consumerKey,
            credential.consumerSecret
        ));
    });
    ipc.send('authenticate-twitter');
}
