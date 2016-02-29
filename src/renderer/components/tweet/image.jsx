import React from 'react';
import Modal from 'react-modal';

export default class TweetImage extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            imageVisible: false
        }
    }
    onClickImage(e) {
        e.preventDefault();
        this.setState({
            imageVisible: true
        });
    }
    onRequestClose() {
        this.setState({
            imageVisible: false
        });
    }

    render() {
        return (
            <div>
                <a href="">
                    <img
                        className="userimg"
                        src={this.props.imageUrl}
                        width={this.props.width}
                        height={this.props.height}
                        onClick={this.onClickImage}
                    />
                </a>
                    onClick={this.onClickImage.bind(this)}
                />
                <Modal
                    isOpen={this.state.imageVisible}
                    closeTimeoutMS={50}
                    onRequestClose={this.onRequestClose.bind(this)}
                >
                    <img src={this.props.imageUrl}/>
                </Modal>
            </div>
        );
    }
}

