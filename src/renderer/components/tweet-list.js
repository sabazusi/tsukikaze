import React from 'react'
import Tweet from './tweet'

export default class TweetList extends React.Component {
    render() {
        return (
            <div>
                {this.props.tweetList.map( (tweet) => {return <Tweet body={tweet}/>} )}
            </div>
        );
    }
}
