import React from 'react'
import TweetList from './tweet-list'
import Switcher from './switcher'
import ipc from 'ipc'
import IpcConstants from '../../utils/constants/ipc-constants';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="application">
                <Switcher stores={this.props.stores}/>
                <TweetList stores={this.props.stores}/>
            </div>
        )
    }
}
