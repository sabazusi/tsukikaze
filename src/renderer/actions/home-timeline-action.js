import ActionDispatcher from '../dispatcher/action-dispatcher'
import TwitterClientConstants from '../constants/twitter-client-constants'

export default class HomeTimelineAction {
    constructor(client) {
        this.client = client;
        this.dispatcher = ActionDispatcher;
    }

    start() {
        this.client.verifyCredential().then(({user}) => {
            this.client.homeTimeline({user}).then(({tweets}) => {
                this.dispatcher.dispatch({
                    actionType: TwitterClientConstants.INITIAL_TWEET,
                    tweets: tweets
                });
                this.client.userStream({user}).then(({stream}) => {
                    stream.on('data', (data) => {
                        this.dispatcher.dispatch({
                            actionType: TwitterClientConstants.USER_STREAM_TWEET,
                            data: data
                        });
                    });
                });
            });
        });
    }
}
