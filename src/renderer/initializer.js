import ipc from 'ipc'
import Rx from 'rx'
import Renderer from './renderer'
import ActionDispatcher from './dispatcher/action-dispatcher'
import ViewDispatcher from './dispatcher/view-dispatcher'
import TwitterHomeTimelineStore from './stores/home-timeline-store'
import TweetListStatusStore from './stores/tweet-list-status-store'
import MentionsStore from './stores/mentions-store'
import EditorStore from './stores/editor-store'
import DirectMessageStore from './stores/direct-message-store'
import TwitterClientAction from './actions/twitter-client-action'
import TweetListSwitchAction from './actions/tweet-list-switch-action'
import EditorAction from './actions/editor-action'

export default class ApplicationInitializer {
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

        // start application.


        setTimeout(() => {
            let preLoad = document.getElementById("preLoad");
            document.body.removeChild(preLoad);
            Renderer.render(stores);
            twitterClientAction.start();
        }, 1000);
    }
}
