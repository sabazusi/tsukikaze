import ActionDispatcher from '../dispatcher/action-dispatcher'
import UserStreamActionFactory from '../utils/userstream-action-factory'

export default class HomeTimelineAction {
    constructor(client) {
        this.client = client;
    }

    start() {
        this.client.verifyCredential().then(({user}) => {
            this.client.homeTimeline({user}).then(({tweets}) => {
                ActionDispatcher.dispatch(UserStreamActionFactory.getInitial(tweets));
                this.client.userStream({user}).then(({stream}) => {
                    stream.on('data', (data) => {
                        ActionDispatcher.dispatch(UserStreamActionFactory.getData(data));
                    });
                });
                this.client.mentions({user}).then(({tweets}) => {
                   ActionDispatcher.dispatch({actionType:"mentions", mentions: tweets});
                });
                this.client.directMessages({user}).then(({tweets}) => {
                   this.dispatcher.dispatch({actionType:"directMessages", dms: tweets});
                });
            });
        });
    }
}
