import React from 'react'
import ControlPanel from './control-panel'
import TweetList from './tweet-list'

export default class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="application">
                <ControlPanel/>
                <TweetList timelineStore={this.props.stores.homeTimeline}/>
            </div>
        )
    }
}