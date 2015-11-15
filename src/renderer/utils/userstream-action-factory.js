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
        return {
            actionType: TwitterClientConstants.USER_STREAM_TWEET,
            data: data
        };
    }
}

export default new UserStreamActionFactory();