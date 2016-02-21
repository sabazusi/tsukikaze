import React from 'react'
import TweetList from './tweet-list'
import Switcher from './switcher'
import EditorButton from './editor-button'
import ipc from 'ipc'
import IpcConstants from '../../utils/constants/ipc-constants';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="application">
                <EditorButton stores={this.props.stores}/>
                <Switcher/>
                <TweetList stores={this.props.stores}/>
            </div>
        )
    }
}
