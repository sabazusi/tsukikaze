import ipc from 'ipc'
import Rx from 'rx'
import Renderer from './renderer'
import ActionDispatcher from './dispatcher/action-dispatcher'
import ViewDispatcher from './dispatcher/view-dispatcher'
import TwitterHomeTimelineStore from './stores/home-timeline-store'
import HomeTimelineAction from './actions/home-timeline-action'

export default class ApplicationInitializer {
    constructor() {
        new TwitterHomeTimelineStore();
    }

    run(twitterClient) {
        // initialize stores.
        let homeTimelineStore = new TwitterHomeTimelineStore();

        // initialize actions.
        let homeTimelineAction = new HomeTimelineAction();

        // start application.




        let dispatcher = ActionDispatcher;
        twitterClient.verifyCredential().then(({user}) => {
            twitterClient.userStream({user}).then(({stream}) => {
                stream.on('data', (data) => {
                    dispatcher.dispatch({
                        actionType: "onData",
                        tweets: data
                    });
                });
            });
        });
        setTimeout(() => {
            let preLoad = document.getElementById("preLoad");
            while(preLoad.firstChild){
                preLoad.removeChild(preLoad.firstChild);
            }
            new Renderer().render(homeTimelineStore);
        }, 1000);
    }

    _start() {
    }
}
