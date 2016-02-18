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

    onEditorButtonClicked(e) {
        // open editor message box.
    }

    getButton() {
        return <Button bsStyle="primary" bsSize="small" className="openEditor" onClick={this.onEditorButtonClicked.bind(this)}><i className="fa fa-pencil fa-2x"></i></Button>
    }

    render() {
        return (
            <div className="editor">
                {this.getButton()}
            </div>
        )
    }
}
