import React from 'react'

export default class Tweet extends React.Component {
    render() {
        return (
                <div className="tweet">
                    <div className="tweet-user">
                        {this.props.name} @{this.props.screenName} <br />
                    </div>
                    <div className="tweet-body">
                        {this.props.text}
                    </div>
                </div>);
    }
}
