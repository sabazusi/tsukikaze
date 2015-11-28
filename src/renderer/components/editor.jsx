import ViewDispatcher from '../dispatcher/view-dispatcher'
import EditorConstants from '../constants/editor-constants'
import React from 'react'

export default class Editor extends React.Component {
    constructor(...args) {
        super(...args);
        this.editorStore = this.props.stores.editorStore;
        this.state = {
            isActiveEditor: this.editorStore.isActiveEditor(),
            isControllable: this.editorStore.isControllable(),
            editorText: this.editorStore.editorText()
        };
    }

    componentDidMount() {
        this.editorStore.onChange(() => {
            this.setState({
                isActiveEditor: this.editorStore.isActiveEditor(),
                isControllable: this.editorStore.isControllable(),
                editorText: this.editorStore.editorText()
            });
        });
    }

    getTweetArea() {
        if(this.state.isActiveEditor) {
            return (
                <div>
                    <button><i className="fa fa-pencil fa-2x" onClick={this.onCloseButtonClicked.bind(this)}></i></button>
                    <textarea rows="2" cols="40" placeholder="tweet...">{this.state.editorText}</textarea>;
                </div>
            );
        } else {
            return <button><i className="fa fa-pencil fa-2x" onClick={this.onOpenButtonClicked.bind(this)}></i></button>;
        }
    }

    onOpenButtonClicked(e) {
        ViewDispatcher.dispatch({
            actionType: EditorConstants.OPEN_EDITOR
        });
    }

    onCloseButtonClicked(e) {
        ViewDispatcher.dispatch({
            actionType: EditorConstants.CLOSE_EDITOR
        });
    }

    render() {
        return (
            <div className="editor">
                {this.getTweetArea()}
            </div>
        )
    }
}
