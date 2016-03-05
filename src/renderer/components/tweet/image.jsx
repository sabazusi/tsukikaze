import React from 'react';
import Modal from 'react-modal';
import TweetImageConstants from '../../constants/tweet-image-constants';
import ViewDispatcher from '../../dispatcher/view-dispatcher';

export default class TweetImage extends React.Component {
    constructor(...args) {
        super(...args);
        this.modalStyle = {
            overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.75)"
            },
            content: {
                padding: "0px"
            }
        };
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

    /**
    render2() {
        return (
            <div>
                <a href="">
                    <img
                        className="userimg"
                        src={this.props.imageUrl}
                        width={this.props.width}
                        height={this.props.height}
                        onClick={this.onClickImage.bind(this)}
                    />
                </a>
                <Modal
                    isOpen={this.state.imageVisible}
                    closeTimeoutMS={50}
                    onRequestClose={this.onRequestClose.bind(this)}
                    style={this.modalStyle}
                >
                    <img src={this.props.imageUrl} className="modalimage"/>
                </Modal>
            </div>
        );
    }
     */
}

