import TwitterClientConstants from '../constants/twitter-client-constants'

class UserStreamActionFactory {
    constructor() {
    }

    getInitial(tweets) {
        return {
            actionType: TwitterClientConstants.INITIAL_TWEET,
            tweets: tweets
        }
    }

    getData(data) {
        if (data.friend) {
        } else if (data.event) {
        } else if (data.delete) {
        } else if (data.created_at) {
            return {
                actionType: TwitterClientConstants.USER_STREAM_TWEET,
                tweet: data
            };
        }
        return {};
    }
}

export default new UserStreamActionFactory();
