import React from 'react'
import ViewDispatcher from '../dispatcher/view-dispatcher'
import TweetBodyConstants from '../constants/tweet-body-constants'
import twitterText from 'twitter-text'
import TweetOption from './tweet-option'
import PostDateLabelFactory from '../utils/post-date-label-factory'

class UrlText extends React.Component {
    onLinkClicked(event) {
        event.preventDefault();
        ViewDispatcher.dispatch({
            actionType: TweetBodyConstants.OPEN_LINK,
            url: event.currentTarget.href
        });
    }

    render() {
        return <a
                   href={this.props.href}
                   onClick={this.onLinkClicked.bind(this)}
                   dangerouslySetInnerHTML={{__html: this.props.text}}
               />
    }
}

class ExtendedEntities {
    constructor(rawEntities) {
        this.mediaUrls = [];
        if (rawEntities && rawEntities.media){
            rawEntities.media.forEach((media) => {
                if (media.type === 'photo') {
                    this.mediaUrls.push({
                        url: media.media_url,
                        width: media.sizes.large.w,
                        height: media.sizes.large.h
                    });
                }
            });
        }
    }

    getMediaUrls (){
        return this.mediaUrls;
    }
}

class Image extends React.Component {
    render() {
        return <img className="userimg" src={this.props.imageUrl} width={this.props.width} height={this.props.height}/>;
    }
}

export default class Tweet extends React.Component {
    getTweetBody() {
        const origin = this.props.tweet.text;
        const result = [];

        const extended = new ExtendedEntities(this.props.tweet.extended_entities);
        let index = 0;
        twitterText.extractEntitiesWithIndices(
            origin,
            {extractUrlsWithoutProtocol:false}
        ).forEach((entity) => {
            if (index != entity.indices[0]) {
                result.push(origin.substring(index, entity.indices[0]));
            }
            result.push(this.getTargetComponent(
                    origin.substring(entity.indices[0], entity.indices[1]),
                    entity
                ));
            index = entity.indices[1];
        });
        result.push(origin.substring(index, origin.length));
        if (extended.getMediaUrls().length > 0) {
            result.push(this.getImageBlock(extended.getMediaUrls()));
        }
        return result;
    }

    getImageBlock(imageUrls) {
        const images = imageUrls.map((url) => {
            let scale = 120 / Math.max(url.width, url.height);
            let width = Math.floor(url.width * scale);
            let height = Math.floor(url.height * scale);
            return <Image imageUrl={url.url} width={width} height={height}/>;
        });
        return (<div>
                {images}
                </div>);
    }

    getTargetComponent(targetText, entity) {
        if (entity.url) {
            return <UrlText href={entity.url} text={targetText}/>;
        } else if(entity.screenName) {
            let url = "http://twitter.com/" + entity.screenName;
            return <UrlText href={url} text={targetText}/>;
        } else {
            return <div>{targetText}</div>;
        }
    }

    getTweetProfileImageUrl() {
        return this.props.tweet.sender ? this.props.tweet.sender.profile_image_url : this.props.tweet.user.profile_image_url;
    }

    getTweetDate() {
        let date = new Date(Date.parse(this.props.tweet.created_at));
        return PostDateLabelFactory.create(date)
    }

    render() {
        return (
                <div className="tweet" key={this.props.tweet.id_str}>
                    <table className="tweet-body-header">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="tweet-user">
                                        {this.props.name} @{this.props.screenName} <br />
                                    </div>
                                </td>
                                <td>
                                    <div className="tweet-date">
                                        {this.getTweetDate()}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="tweet-body-contents">
                        <tbody>
                            <tr>
                                <td className="user-image">
                                    <div>
                                        <Image imageUrl={this.getTweetProfileImageUrl()} width={50} height={50} />
                                    </div>
                                </td>
                                <td className="tweet-body">
                                    <div className="tweet-body-text">
                                        {this.getTweetBody()}
                                    </div>
                                </td>
                                <td className="tweet-option">
                                    <div>
                                        <TweetOption tweet={this.props.tweet}/>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
    }
}
