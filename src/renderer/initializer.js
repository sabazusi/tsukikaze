import ipc from 'ipc'

export default class ApplicationInitializer {
    constructor() {
    }

    run(twitterClient) {
        twitterClient.lists().then(({lists}) => {
            console.log(lists);
        });
    }
}