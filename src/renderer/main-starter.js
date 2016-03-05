import remote from 'remote';
import ipc from 'ipc';
import Renderer from './renderer';
import ActionDispatcher from './dispatcher/action-dispatcher';
import ViewDispatcher from './dispatcher/view-dispatcher';
import TwitterHomeTimelineStore from './stores/home-timeline-store';
import TweetListStatusStore from './stores/tweet-list-status-store';
import MentionsStore from './stores/mentions-store';
import EditorStore from './stores/editor-store';
import DirectMessageStore from './stores/direct-message-store';
import TweetImageStore from './stores/tweet-image-store';
import WindowStatusStore from './stores/window-status-store';
import TwitterClientAction from './actions/twitter-client-action';
import TweetImageAction from './actions/tweet-image-action';
import ExternalAction from './actions/external-action';
import TweetListSwitchAction from './actions/tweet-list-switch-action';
import EditorAction from './actions/editor-action';
import IpcAction from './actions/ipc-action';

export default class MainApplicationStarter {
    constructor() {
    }


    start(twitterClient) {
        // initialize stores.
        let stores = {
            homeTimelineStore: new TwitterHomeTimelineStore(),
            tweetListStatusStore: new TweetListStatusStore(),
            mentionsStore: new MentionsStore(),
            directMessageStore: new DirectMessageStore(),
            editorStore: new EditorStore(),
            windowStatusStore: new WindowStatusStore(),
            tweetImageStore: new TweetImageStore()
        };

        // initialize actions.
        let twitterClientAction = new TwitterClientAction(twitterClient);
        new TweetListSwitchAction();
        new EditorAction();
        new ExternalAction();
        new IpcAction();
        new TweetImageAction();

        // initialize context menu.
        let Menu = remote.require('menu');
        let MenuItem = remote.require('menu-item');

        let menu = new Menu();
        window.addEventListener('contextmenu', (e) => {
            // TODO: e.targetの内容を見てmenuItemを出し分ける
        });

        // start application.
        Renderer.render(stores);
        twitterClientAction.start();
    }
}
