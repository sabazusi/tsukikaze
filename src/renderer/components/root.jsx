import React from 'react'
import ControlPanel from './control-panel'
import TweetList from './tweet-list'
import Switcher from './switcher'

export default class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="application">
                <ControlPanel/>
                <Switcher/>
                <TweetList stores={this.props.stores}/>
            </div>
        )
    }
}