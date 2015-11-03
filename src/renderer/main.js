import ipc from 'ipc'
import ApplicationInitializer from './initializer'
import TwitterClient from './actions/observables/twitter-client'

// debug
//localStorage.clear();
ipc.on('login-succeeded', function(newAccessToken, newAccessTokenSecrent, twitterClient) {
    // login succeeded
    ipc.send('log', JSON.stringify(twitterClient));
    let newKey = JSON.stringify({
        accessToken: newAccessToken,
        accessTokenSecrent: newAccessTokenSecrent
    });
    localStorage.setItem('twitter-login-keys', newKey);
    ipc.send('log', 'login succeeded:');
});

let loginKeys = JSON.parse(localStorage.getItem('twitter-login-keys'));
if (loginKeys) {
    ipc.on('consumer-keys', function(credential){
        new ApplicationInitializer().run( new TwitterClient(
            loginKeys.accessToken,
            loginKeys.accessTokenSecrent,
            credential.consumerKey,
            credential.consumerSecret
        ));
    });
    ipc.send('require-consumer-keys', loginKeys.accessToken, loginKeys.accessTokenSecrent);

} else {
    ipc.on('consumer-and-access-keys', function(accessToken, accessTokenSecrent, credential){
        new ApplicationInitializer().run( new TwitterClient(
            accessToken,
            accessTokenSecrent,
            credential.consumerKey,
            credential.consumerSecret
        ));
    });
    ipc.send('authenticate-twitter');
}
