import ipc from 'ipc';
import IpcConstants from '../utils/constants/ipc-constants';
import MainApplicationInitializer from './main-initializer';
import TwitterClient from '../utils/twitter-client';
import Renderer from './renderer';


setTimeout(() => {
    Renderer.renderPreload();
}, 100);

const initialize = (aToken, aSecret, cKey, cSecret) => {
    new MainApplicationInitializer().run( new TwitterClient(
        aToken,
        aSecret,
        cKey,
        cSecret
    ));
};


ipc.on(IpcConstants.LOGIN_TWITTER, (credentials) => {
    initialize(
        credentials.accessToken,
        credentials.accessTokenSecret,
        credentials.consumerKey,
        credentials.consumerSecret
    );
});

ipc.send(IpcConstants.REQUIRE_CREDENTIALS);
