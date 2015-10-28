import ipc from 'ipc'
import Rx from 'rx'

export default class ApplicationInitializer {
    constructor() {
        setTimeout( () => {
            let preLoad = document.getElementById("preLoad");
            while(preLoad.firstChild){
                preLoad.removeChild(preLoad.firstChild);
            }
        }, 1000);
    }

    run(twitterClient) {
        Rx.Observable.fromPromise(twitterClient.verifyCredential())
            .subscribe(({user, response}) => {
                console.log(user);
            }
        );
    }
}