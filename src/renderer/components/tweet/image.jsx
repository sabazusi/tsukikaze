import React from 'react';
import Modal from 'react-modal';
import TweetImageConstants from '../../constants/tweet-image-constants';
import ViewDispatcher from '../../dispatcher/view-dispatcher';

export default class TweetImage extends React.Component {
    constructor(...args) {
        super(...args);
    }

    onClickImage(e) {
        e.preventDefault();

        let selectedIndex =
            this.props.images.indexOf(this.props.images.filter((image) => {
                return image.url == e.target.src
            }).shift());
        ViewDispatcher.dispatch({
            actionType: TweetImageConstants.OPEN_IMAGE,
            images: this.props.images,
            index: selectedIndex
        });
    }

    getImages() {
        return this.props.images.map((url) => {
            let scale = 120 / Math.max(url.width, url.height);
            let width = Math.floor(url.width * scale);
            let height = Math.floor(url.height * scale);
            return <img
                className="userimg"
                src={url.url}
                width={width}
                height={height}
                onClick={this.onClickImage.bind(this)}
            />;
        });
    }

    render() {
        return (
            <div>
                {this.getImages()}
            </div>
        );
    }
}

