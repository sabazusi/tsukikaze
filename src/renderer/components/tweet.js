import React from 'react'

export default class Tweet extends React.Component {
    render() {
        return (<div className="tweet">{this.props.body}</div>);
    }
}
