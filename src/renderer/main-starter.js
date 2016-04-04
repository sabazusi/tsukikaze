import ActionDispatcher from './dispatcher/action-dispatcher';
import ContextMenuAction from './actions/contextmenu-action';
import ClipboardAction from './actions/clipboard-action';
import DirectMessageStore from './stores/direct-message-store';
import EditorAction from './actions/editor-action';
import EditorStore from './stores/editor-store';
import ExternalAction from './actions/external-action';
import IpcAction from './actions/ipc-action';
import MentionsStore from './stores/mentions-store';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import TweetImageAction from './actions/tweet-image-action';
import TweetImageStore from './stores/tweet-image-store';
import TweetListStatusStore from './stores/tweet-list-status-store';
import TweetListSwitchAction from './actions/tweet-list-switch-action';
import TwitterClientAction from './actions/twitter-client-action';
import TwitterHomeTimelineStore from './stores/home-timeline-store';
import ViewDispatcher from './dispatcher/view-dispatcher';
import WindowStatusStore from './stores/window-status-store';
import ipc from 'ipc';
import remote from 'remote';

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
        new ContextMenuAction();
        new ClipboardAction();

        // start application.
        ReactDOM.render(
            <Root stores={stores}/>, document.getElementById("postLoad")
        );

        twitterClientAction.start();
    }
}
