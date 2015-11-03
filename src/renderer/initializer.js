import ipc from 'ipc'
import Rx from 'rx'
import Renderer from './renderer'

export default class ApplicationInitializer {
    constructor() {
    }

    run(twitterClient) {
        twitterClient.verifyCredential().then(({user}) => {
            Rx.Observable.fromPromise(twitterClient.userStream({user})) 
                .subscribe(({stream}) => {
                    stream.on('data', (data) => {console.log(data);});
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
