import React from 'react';

/**
 * TODO: ユーザー画像とツイート内画像の２つで使われてるので、分離する
 */
export default class TweetImage extends React.Component {
    onClickImage(e) {
    }
    render() {
        return (
            <img
                className="userimg"
                src={this.props.imageUrl}
                width={this.props.width}
                height={this.props.height}
                onClick={this.onClickImage}
            />
        );
    }
}

