import ipc from 'ipc'
import Rx from 'rx'

export default class ApplicationInitializer {
    constructor() {
    }

    run(twitterClient) {
        Rx.Observable.fromPromise(twitterClient.verifyCredential())
            .subscribe(({user, response}) => {
                console.log(user);
            }
        );
    }
}