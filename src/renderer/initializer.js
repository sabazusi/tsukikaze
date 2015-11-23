import ipc from 'ipc'
import Rx from 'rx'
import Renderer from './renderer'
import ActionDispatcher from './dispatcher/action-dispatcher'
import ViewDispatcher from './dispatcher/view-dispatcher'
import TwitterHomeTimelineStore from './stores/home-timeline-store'
import HomeTimelineAction from './actions/home-timeline-action'
import TweetListSwitchAction from './actions/tweet-list-switch-action'

export default class ApplicationInitializer {
    constructor() {
    }


    run(twitterClient) {
        // initialize stores.
        let stores = {
            homeTimeline: new TwitterHomeTimelineStore()
        };

        // initialize actions.
        let homeTimelineAction = new HomeTimelineAction(twitterClient);
        let TweetsSwitchAction = new TweetListSwitchAction();

        // start application.


        setTimeout(() => {
            let preLoad = document.getElementById("preLoad");
            document.body.removeChild(preLoad);
            Renderer.render(stores);
            homeTimelineAction.start();
        }, 1000);
    }
}
