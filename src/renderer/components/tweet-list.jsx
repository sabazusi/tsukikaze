import React from 'react';
import Modal from 'react-modal';
import Tweet from './tweet/tweet';
import ViewDispatcher from '../dispatcher/view-dispatcher';
import TweetImageConstants from '../constants/tweet-image-constants';
import ImageResizer from '../utils/image-resizer';

export default class TweetList extends React.Component {
    constructor(...args) {
        super(...args);
        this.timelineStore = this.props.stores.homeTimelineStore;
        this.mentionsStore = this.props.stores.mentionsStore;
        this.dmStore = this.props.stores.directMessageStore;
        this.tweetStatusStore = this.props.stores.tweetListStatusStore;
        this.windowStatusStore = this.props.stores.windowStatusStore;
        this.tweetImageStore = this.props.stores.tweetImageStore;
        this.state = {}
    }

    componentDidMount() {
        this.tweetStatusStore.onChange(() => {
            this.forceUpdate();
        });
        this.timelineStore.onChange(() => {
            this.forceUpdate();
        });
        this.mentionsStore.onChange(() => {
            this.forceUpdate();
        });
        this.dmStore.onChange(() => {
            this.forceUpdate();
        });
        this.windowStatusStore.onChange(() => {
            this.forceUpdate();
        });
        this.tweetImageStore.onChange(() => {
            this.forceUpdate();
        });
    }

    getTweets() {
        if (this.tweetStatusStore.homeTimelineEnabled()) {
            return this.timelineStore.getVal().map((rawTweet) => {
                return <Tweet key={"tl" + rawTweet.id_str} tweet={rawTweet} name={rawTweet.user.name} screenName={rawTweet.user.screen_name}/>;
            });
        } else if(this.tweetStatusStore.mentionEnabled()) {
            return this.mentionsStore.getVal().map((rawTweet) => {
                return <Tweet key={"mention"+rawTweet.id_str} tweet={rawTweet} name={rawTweet.user.name} screenName={rawTweet.user.screen_name}/>;
            });
        } else if(this.tweetStatusStore.directMessageEnabled()) {
            return this.dmStore.getVal().map((rawTweet) => {
                return <Tweet key={"dm"+rawTweet.id_str} tweet={rawTweet} name={rawTweet.sender.name} screenName={rawTweet.sender.screen_name}/>;
            });
        }
    }


    getDummyTweets() {
        return (
            <div>
                <div className="initial-loading-logo">
                    <div className="cssload-loader"></div>
                </div>
                <div className="dummy-tweets">
                </div>
            </div>
        );
    }

    getOverlayContents() {
        let modalStyle = {
            overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.75)"
            },
            content: {
                backgroundColor: "rgba(1,1,1,0)",
                padding: "0px",
                bottom: "auto"
            }
        };

        let currentImage = this.tweetImageStore.currentImage();
        let imageSize = ImageResizer.getModalImageSize(
            currentImage,
            this.windowStatusStore.getWindowSize()
        );
        modalStyle["content"]["top"] = imageSize.verticalMargin;
        modalStyle["content"]["left"] = imageSize.horizontalMargin;
        modalStyle["content"]["right"] = imageSize.horizontalMargin;

        return (
            <Modal
                isOpen={this.tweetImageStore.imageModalEnabled()}
                closeTimeoutMS={50}
                onRequestClose={this.onRequestClose.bind(this)}
                style={modalStyle}
            >
                <a href="" onClick={this.onClickImage.bind(this)}>
                    <img
                        className="modal-image"
                        src={currentImage.url}
                        width={imageSize.width}
                        height={imageSize.height}
                    />
                </a>
                {this.getBackwardArrow()}
                {this.getForwardArrow()}
            </Modal>
        );
    }

    getBackwardArrow() {
        return this.tweetImageStore.transitionBackwardEnabled() ?
            this.getButton("<", TweetImageConstants.TRANSITION_BACKWARD, "modal-arrow-backward") : "";
    }

    getForwardArrow() {
        return this.tweetImageStore.transitionForwardEnabled() ?
            this.getButton(">", TweetImageConstants.TRANSITION_FORWARD, "modal-arrow-forward") : "";
    }

    getButton(arrowMark, clickedActionType, modalClassName) {
        let clickHandler = (e) => {
            e.preventDefault();
            ViewDispatcher.dispatch({
                actionType: clickedActionType
            });
        };
        let modalClass = "modal-arrow " + modalClassName;
        return (
            <a href="" className="image-transition-link" onClick={clickHandler}>
                <div className={modalClass}>
                    <b>
                        {arrowMark}
                    </b>
                </div>
            </a>
        );
    }

    onClickImage(e) {
        e.preventDefault();
        ViewDispatcher.dispatch({
            actionType: TweetImageConstants.CLOSE_IMAGE
        });
    }

    onRequestClose() {
        ViewDispatcher.dispatch({
            actionType: TweetImageConstants.CLOSE_IMAGE
        });
    }

    render() {
        let style = {};
        style["maxHeight"] = this.windowStatusStore.getTweetListMaxHeight();
        if (!this.timelineStore.hasInitialized()) {
            return (
                <div>
                    {this.getDummyTweets()}
                </div>
            );
        } else {
            return (
                <div className="tweet-list" style={style}>
                    {this.getTweets()}
                    {this.getOverlayContents()}
                </div>
            );
        }
    }
}
