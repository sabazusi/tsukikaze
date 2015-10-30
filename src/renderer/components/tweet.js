import React from 'react'

export default class Tweet extends React.Component {
    render() {
        return (<div>{this.props.body}</div>);
    }
}
