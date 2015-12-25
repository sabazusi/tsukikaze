import React from 'react'
import ControlPanel from './control-panel'
import TweetList from './tweet-list'
import Switcher from './switcher'
import Editor from './editor'
import ipc from 'ipc'

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweetsMaxHeight: this.getTweetsMaxHeight(700)
        };
    }

    componentDidMount() {
        ipc.on("resize", (bounds) => {
            this.setState({
                tweetsMaxHeight: this.getTweetsMaxHeight(bounds[1])
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
