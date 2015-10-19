import ipc from 'ipc'
import ApplicationInitializer from './initializer'

ipc.on('login-succeeded', function(e) {
    // login succeeded
//    new ApplicationInitializer().run();
});

ipc.on('login-succeeded-with-authentication', function(e, newKey) {
    // login succeeded with new authentication.
    localStorage.setItem('twitter-login-keys', newKey);
});

localStorage.clear();
let loginKeys = localStorage.getItem('twitter-login-keys');
if (loginKeys) {
    ipc.send('login-twitter', loginKeys);
} else {
    ipc.send('authenticate-twitter');
}