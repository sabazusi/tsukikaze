import ipc from 'ipc'
import ApplicationInitializer from './initializer'

// debug
// localStorage.clear();
ipc.on('login-succeeded', function(newAccessToken, newAccessTokenSecrent) {
    // login succeeded
//    new ApplicationInitializer().run();
    let newKey = JSON.stringify({
        accessToken: newAccessToken,
        accessTokenSecrent: newAccessTokenSecrent
    });
    localStorage.setItem('twitter-login-keys', newKey);
    ipc.send('log', 'login succeeded:');
});

let loginKeys = JSON.parse(localStorage.getItem('twitter-login-keys'));
if (loginKeys) {
    ipc.send('login-twitter', loginKeys.accessToken, loginKeys.accessTokenSecrent);
} else {
    ipc.send('authenticate-twitter');
}