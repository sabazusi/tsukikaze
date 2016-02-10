import React from 'react'
import TweetList from './tweet-list'
import Switcher from './switcher'
import Editor from './editor'
import ipc from 'ipc'
import IpcConstants from '../../utils/constants/ipc-constants';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweetsMaxHeight: this.getTweetsMaxHeight(window.outerHeight)
        };
    }

    componentDidMount() {
        ipc.on(IpcConstants.UPDATE_WINDOW_SIZE, (width, height) => {
            this.setState({
                tweetsMaxHeight: this.getTweetsMaxHeight(height)
            });
        });
    }

    getTweetsMaxHeight(windowHeight) {
        // remove editor, window-bar height.
        return windowHeight - 83;
    }

    render() {
        return (
            <div className="application">
                <Editor stores={this.props.stores}/>
                <Switcher/>
                <TweetList stores={this.props.stores} maxHeight={this.state.tweetsMaxHeight}/>
            </div>
        )
    }
}
