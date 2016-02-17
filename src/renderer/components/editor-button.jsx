import ViewDispatcher from '../dispatcher/view-dispatcher'
import EditorConstants from '../constants/editor-constants'
import React from 'react'
import remote from 'remote'
import { Button } from 'react-bootstrap'

export default class EditorButton extends React.Component {
    constructor(...args) {
        super(...args);
        this.editorStore = this.props.stores.editorStore;
        this.state = {
            editorText: this.editorStore.editorText()
        };
    }

    componentDidMount() {
        this.dialog = remote.require('dialog');
    }

    getButton() {
        return null;
    }

    render() {
        return (
            <div className="editor">
                {this.getButton()}
            </div>
        )
    }
}
