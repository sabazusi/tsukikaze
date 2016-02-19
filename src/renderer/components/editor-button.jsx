import ViewDispatcher from '../dispatcher/view-dispatcher'
import EditorConstants from '../constants/editor-constants'
import React from 'react'
import remote from 'remote'
import Modal from 'react-modal'
import { Button } from 'react-bootstrap'

export default class EditorButton extends React.Component {
    constructor(...args) {
        super(...args);
        this.editorStore = this.props.stores.editorStore;
        this.state = {
            editorText: this.editorStore.editorText(),
            isEditorOpen: false
        };
    }

    componentDidMount() {
        this.dialog = remote.require('dialog');
    }

    onEditorButtonClicked(e) {
        // open editor message box.
        this.setState({isEditorOpen: true});
    }
    onRequestClose() {
        console.log("うむ");
        this.setState({isEditorOpen: false});
    }

    getButton() {
        return <Button bsStyle="primary" bsSize="small" className="openEditor" onClick={this.onEditorButtonClicked.bind(this)}><i className="fa fa-pencil fa-2x"></i></Button>
    }

    getEditor() {
        return (
            <Modal
                isOpen={this.state.isEditorOpen}
                closeTimeoutMS={50}
                onRequestClose={this.onRequestClose.bind(this)}
            >
                <div>aaaaaaaa</div>
            </Modal>
        );
    }

    render() {
        return (
            <div className="editor">
                {this.getButton()}
                {this.getEditor()}
            </div>
        )
    }
}
