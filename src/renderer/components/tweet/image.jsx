import React from 'react';

export default class TweetImage extends React.Component {
    onClickImage(e) {
        e.preventDefault();
    }
    render() {
        return (
            <a href="">
                <img
                    className="userimg"
                    src={this.props.imageUrl}
                    width={this.props.width}
                    height={this.props.height}
                    onClick={this.onClickImage}
                />
            </a>
        );
    }
}

