import ActionDispatcher from '../dispatcher/action-dispatcher'
import ViewDispatcher from '../dispatcher/view-dispatcher'
import UserStreamActionFactory from '../utils/userstream-action-factory'
import EditorConstants from '../constants/editor-constants'
import TwitterClientConstants from '../constants/twitter-client-constants'
import TweetOptionConstants from '../constants/tweet-option-constants'

export default class TwitterClientAction {
    constructor(client) {
        this.client = client;

        ViewDispatcher.register((action) => {
            switch(action.actionType) {
                case EditorConstants.POST_TWEET:
                    this.client.post(action.tweet).then(({tweet}) => {
                        ActionDispatcher.dispatch({
                            actionType: TwitterClientConstants.POST_COMPLETED
                        });
                    });
                    break;

                case TweetOptionConstants.FAV_TWEET:
                    this.client.favorite(
                        action.tweetId,
                        action.isFav
                    ).then(({tweet}) => {
                        console.log("faved");
                    });
                    break;

                case TweetOptionConstants.RT_TWEET:
                    this.client.retweet(
                        action.tweetId
                    ).then(({tweet}) => {
                        console.log("rtweeted");
                    });
                    break;

                default:
                    break;
            }
        });
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
                   ActionDispatcher.dispatch({actionType:"directMessages", dms: tweets});
                });
            });
        });
    }
}
