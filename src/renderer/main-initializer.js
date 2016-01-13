import remote from 'remote'
import ipc from 'ipc'
import Renderer from './renderer'
import ActionDispatcher from './dispatcher/action-dispatcher'
import ViewDispatcher from './dispatcher/view-dispatcher'
import TwitterHomeTimelineStore from './stores/home-timeline-store'
import TweetListStatusStore from './stores/tweet-list-status-store'
import MentionsStore from './stores/mentions-store'
import EditorStore from './stores/editor-store'
import DirectMessageStore from './stores/direct-message-store'
import TwitterClientAction from './actions/twitter-client-action'
import ExternalAction from './actions/external-action'
import TweetListSwitchAction from './actions/tweet-list-switch-action'
import EditorAction from './actions/editor-action'

export default class MainApplicationInitializer {
    constructor() {
    }


    run(twitterClient) {
        // initialize stores.
        let stores = {
            homeTimelineStore: new TwitterHomeTimelineStore(),
            tweetListStatusStore: new TweetListStatusStore(),
            mentionsStore: new MentionsStore(),
            directMessageStore: new DirectMessageStore(),
            editorStore: new EditorStore()
        };

        // initialize actions.
        let twitterClientAction = new TwitterClientAction(twitterClient);
        new TweetListSwitchAction();
        new EditorAction();
        new ExternalAction();

        // initialize context menu.
        let Menu = remote.require('menu');
        let MenuItem = remote.require('menu-item');

        let menu = new Menu();
        window.addEventListener('contextmenu', (e) => {
            // TODO: e.targetの内容を見てmenuItemを出し分ける
        });

        // start application.
        setTimeout(() => {
            let preLoad = document.getElementById("preLoad");
            document.body.removeChild(preLoad);
            Renderer.render(stores);
            twitterClientAction.start();
        }, 1000);
    }
}
