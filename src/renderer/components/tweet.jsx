import React from 'react'
import ViewDispatcher from '../dispatcher/view-dispatcher'
import TweetBodyConstants from '../constants/tweet-body-constants'
import twitterText from 'twitter-text'

class UrlText extends React.Component {
    onClickedLink(event) {
        event.preventDefault();
        ViewDispatcher.dispatch({
            actionType: TweetBodyConstants.OPEN_LINK,
            url: event.currentTarget.href
        });
    }

    render() {
        return <a
                   href={this.props.href}
                   onClick={this.onClickedLink.bind(this)}
                   dangerouslySetInnerHTML={{__html: this.props.text}}
               />
    }
}

export default class Tweet extends React.Component {
    getTweetBody() {
        const origin = this.props.text;
        const result = [];
        const images = [];
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
        return result;
    }

    getTargetComponent(targetText, entity) {
        if (entity.url) {
            return <UrlText href={entity.url} text={targetText}/>;
        } else if(entity.screenName) {
            let url = "http://twitter.com/" + entity.screenName;
            return <UrlText href={url} text={targetText}/>;
        } else {
            return targetText;
        }
    }

    render() {
        return (
                <div className="tweet">
                    <div className="tweet-user">
                        {this.props.name} @{this.props.screenName} <br />
                    </div>
                    <div className="tweet-body">
                        {this.getTweetBody()}
                    </div>
                </div>);
    }
}
