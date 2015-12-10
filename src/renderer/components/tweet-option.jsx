import React from 'react'
import TweetOptionConstants from '../constants/tweet-option-constants'
import ViewDispatcher from '../dispatcher/view-dispatcher'
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'

export default class TweetOption extends React.Component {
    constructor() {
        super();
    }

    getUser() {
        let rawTweet = this.props.tweet;
        if (rawTweet.user) {
            return rawTweet.user;
        } else if(rawTweet.sender) {
            return rawTweet.sender;
        } else {
            return {};
        }
    }

    onMentionClicked() {
        ViewDispatcher.dispatch({
            actionType: TweetOptionConstants.OPEN_MENTION,
            screenName: this.getUser().screen_name
        });
    }

    onDMClicked() {
        ViewDispatcher.dispatch({
            actionType: TweetOptionConstants.OPEN_DM,
            screenName: this.getUser().screen_name
        });
    }

    onFavClicked() {
        ViewDispatcher.dispatch({
            actionType: TweetOptionConstants.FAV_TWEET,
            tweetId: this.props.tweet.id_str,
            isFav: !this.props.tweet.favorited
        });
    }

    onRetweetClicked() {
        ViewDispatcher.dispatch({
            actionType: TweetOptionConstants.RT_TWEET,
            tweetId: this.props.tweet.id_str
        });
    }

    render() {
        let favLabel = this.props.tweet.favorited ? "Unfavorite" : "Favorite";
        return (<div>
                    <ButtonToolbar>
                        <DropdownButton bsSize="small" title="" id="tweet-option-button">
                            <MenuItem eventKey="1" onClick={this.onMentionClicked.bind(this)}>Mention</MenuItem>
                            <MenuItem eventKey="2" onClick={this.onDMClicked.bind(this)}>DirectMessage</MenuItem>
                            <MenuItem eventKey="3" onClick={this.onFavClicked.bind(this)}>{favLabel}</MenuItem>
                            <MenuItem eventKey="4" onClick={this.onRetweetClicked.bind(this)}>ReTweet</MenuItem>
                        </DropdownButton>
                    </ButtonToolbar>
                </div>
            );
    }
}
