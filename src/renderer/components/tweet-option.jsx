import React from 'react'
import TweetOptionConstants from '../constants/tweet-option-constants'
import ViewDispatcher from '../dispatcher/view-dispatcher'
import { Button, ButtonToolbar, OverlayTrigger, Popover } from 'react-bootstrap'

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
        React.findDOMNode(this.refs.button).click();
        ViewDispatcher.dispatch({
            actionType: TweetOptionConstants.OPEN_MENTION,
            screenName: this.getUser().screen_name
        });
    }

    onDMClicked() {
        React.findDOMNode(this.refs.button).click();
        ViewDispatcher.dispatch({
            actionType: TweetOptionConstants.OPEN_DM,
            screenName: this.getUser().screen_name
        });
    }

    onFavClicked() {
        React.findDOMNode(this.refs.button).click();
        ViewDispatcher.dispatch({
            actionType: TweetOptionConstants.FAV_TWEET,
            tweetId: this.props.tweet.id_str,
            isFav: !this.props.tweet.favorited
        });
    }

    onRetweetClicked() {
        React.findDOMNode(this.refs.button).click();
        ViewDispatcher.dispatch({
            actionType: TweetOptionConstants.RT_TWEET,
            tweetId: this.props.tweet.id_str
        });
    }

    render() {
        let favLabel = this.props.tweet.favorited ? "Unfavorite" : "Favorite";
        return (<div>
                    <ButtonToolbar>
                        <OverlayTrigger
                            trigger="click"
                            placement="left"
                            rootClose overlay={
                            <Popover id="tweet-option">
                                <a href="javascript:void(0)" onClick={this.onMentionClicked.bind(this)}>Mention</a><br/>
                                <a href="javascript:void(0)" onClick={this.onDMClicked.bind(this)}>DM</a><br/>
                                <a href="javascript:void(0)" onClick={this.onFavClicked.bind(this)}>{favLabel}</a><br/>
                                <a href="javascript:void(0)" onClick={this.onRetweetClicked.bind(this)}>Retweet</a>
                            </Popover>}
                        >
                            <Button bsStyle="info" ref="button" bsSize="small">></Button>
                        </OverlayTrigger>
                    </ButtonToolbar>
                </div>
            );
    }
}
