import React from 'react'

export default class Editor extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.setState({isWritable: true});
    }

    getTweetArea() {
        if(this.props.isWritable) {
            return <textarea rows="2" cols="40" placeholder="tweet..."></textarea>;
        } else {
            return "";
        }
    }

    render() {
        return (
            <div className="editor">
                {this.getTweetArea()}
            </div>
        )
    }
}
