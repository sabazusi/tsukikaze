import ipc from 'ipc'

export default class ApplicationInitializer {
    constructor() {
    }

    run(twitterClient) {
        twitterClient.verifyCredential().then(({user, response}) => {
            console.log(user);
        });
    }
}