import Twitter from 'twitter';

export default class TwitterClient {
    constructor(accessToken, accessTokenSecret, consumerKey, consumerKeySecret) {
        this.twitter = new Twitter({
            access_token_key: accessToken,
            access_token_secret: accessTokenSecret,
            consumer_key: consumerKey,
            consumer_secret: consumerKeySecret
        });
    }

    favorite(tweetId, isFav) {
        let method = isFav ? 'create' : 'destroy';
        return new Promise((resolve, reject) => {
            this.twitter.post(
                'favorites/' + method,
                {id: tweetId},
                (error, tweet, response) => {
                    resolve({tweet: tweet});
                }
            );
        });
    }

    verifyCredential() {
        return new Promise((resolve, reject) => {
            this.twitter.get(
                'account/verify_credentials',
                (error, user, response) => {
                    resolve({user:user, response:response});
                }
            )
        });
    }

    post(tweet) {
        return new Promise((resolve, reject) => {
           this.twitter.post(
               'statuses/update',
               {
                   status: tweet
               },
               (error, tweet, response) => {
                   resolve({tweet: tweet, response: response});
               }
           );
        });
    }

    lists() {
        return new Promise((resolve, reject) => {
            this.twitter.get(
               'lists/list',
                (error, lists, response) => {
                    resolve({lists: lists, response: response});
                }
            )
        });
    }

    homeTimeline({screenName}) {
        return new Promise((resolve, reject) => {
            this.twitter.get(
                'statuses/home_timeline',
                {
                    screen_name: screenName
                },
                (error, tweets, response) => {
                    resolve({ tweets: tweets, response: response });
                }
            );
        });
    }

    mentions({screen_name}) {
        return new Promise((resolve, reject) => {
            this.twitter.get('statuses/mentions_timeline',
            {
                screen_name:screen_name
            },
            (error, tweets, response) => {
                resolve({tweets: tweets});
            });
        })
    }

    directMessages({screen_name}) {
        return new Promise((resolve, reject) => {
            this.twitter.get('direct_messages',
            {
            },
                (error, tweets, response) => {
                    resolve({tweets: tweets});
                }
            );
        });
    }

    userStream({user}) {
        return new Promise((resolve, reject) => {
            this.twitter.stream(
                'user',
                (stream) =>{
                    resolve({stream: stream});
                }
            );
        });
    }
}
