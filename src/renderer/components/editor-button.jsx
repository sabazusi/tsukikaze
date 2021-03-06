import ViewDispatcher from '../dispatcher/view-dispatcher';
import EditorConstants from '../constants/editor-constants';
import React from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import Editor from './editor';

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
        this.modalStyle = {
            overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.75)"
            },
            content: {
                top: "30%",
                bottom: "30%",
                padding: "0px"
            }
        };
    }

    onEditorButtonClicked(e) {
        ViewDispatcher.dispatch({
            actionType: EditorConstants.OPEN_EDITOR
        });

        this.setState({isEditorOpen: true});
    }
    onRequestClose() {
        ViewDispatcher.dispatch({
            actionType: EditorConstants.CLOSE_EDITOR
        });
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
                style={this.modalStyle}
            >
                <Editor stores={this.props.stores}/>
            </Modal>
        );
    }

    render() {
        return (
            <div>
                {this.getButton()}
                {this.getEditor()}
            </div>
        )
    }
}
