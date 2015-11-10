import React from 'react'
import Tweet from './tweet'

export default class TweetList extends React.Component {
    constructor(...args) {
        super(...args);
        this.timelineStore = this.props.timelineStore;
        this.state = {
            val: this.timelineStore.getVal()
        }
    }

    componentDidMount() {
        this.timelineStore.on("updated", (newTweets) => {
            this.setState({
                val: newTweets.text
            });
        });
    }

    render() {
        return (
            <div>
                {this.props.tweetList.map( (tweet) => {return <Tweet body={tweet}/>} )}
                {this.state.val}
            </div>
        );
    }
}
