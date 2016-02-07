import ipc from 'ipc';
import IpcConstants from '../utils/constants/ipc-constants';
import MainApplicationStarter from './main-starter';
import TwitterClient from '../utils/twitter-client';
import Renderer from './renderer';
import LocalStorageKeyConstants from './../utils/constants/local-storage-key-constants';


const initialize = (aToken, aSecret, cKey, cSecret) => {
    new MainApplicationStarter().start(new TwitterClient(
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

ipc.on(IpcConstants.UPDATE_WINDOW_SIZE, (width, height) => {
    let newWindowSize = {width: width, height: height};
    localStorage.setItem(
        LocalStorageKeyConstants.INITIAL_WINDOW_SIZE, JSON.stringify(newWindowSize)
    );
});

ipc.send(IpcConstants.REQUIRE_CREDENTIALS);
