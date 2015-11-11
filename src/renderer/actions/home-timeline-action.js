import ActionDispatcher from '../dispatcher/action-dispatcher'

export default class HomeTimelineAction {
    constructor(client) {
        this.client = client;
        this.dispatcher = ActionDispatcher;
    }

    start() {
        this.client.verifyCredential().then(({user}) => {
            this.client.homeTimeline({user}).then(({tweets}) => {
                this.dispatcher.dispatch({
                    actionType: "initialTweet",
                    tweets: tweets
                });
            });
        });
    }
}
