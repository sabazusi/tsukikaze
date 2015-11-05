import ipc from 'ipc'
import Rx from 'rx'
import Renderer from './renderer'
import Dispatcher from './dispatcher/action-dispatcher'
import TwitterHomeTimelineStore from './stores/home-timeline-store'

export default class ApplicationInitializer {
    constructor() {
        new TwitterHomeTimelineStore();
    }

    run(twitterClient) {
        let dispatcher = Dispatcher;
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
        setTimeout(this._start, 1000);
    }

    _start() {
        let preLoad = document.getElementById("preLoad");
        while(preLoad.firstChild){
            preLoad.removeChild(preLoad.firstChild);
        }
        new Renderer().render();
    }
}
