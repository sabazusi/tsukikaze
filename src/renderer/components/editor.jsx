import ViewDispatcher from '../dispatcher/view-dispatcher';
import EditorConstants from '../constants/editor-constants';
import React from 'react';
import remote from 'remote';
import { Button } from 'react-bootstrap';

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
        this.dialog = remote.require('dialog');
    }

    getRemainCount() {
        let count = this.editorStore.remainTextCount();
        let countClass = count >= 0 ? "postable" : "over";
        return <span className={countClass}>{count}</span>;
    }

    getTweetArea() {
        return (
            <div>
                <Button bsSize="small" onClick={this.onMediaButtonClicked.bind(this)} className="uploadMedia"><i className="fa fa-file-image-o fa-2x"></i></Button>
                <Button bsSize="small" onClick={this.onPostButtonClicked.bind(this)} className="postEditorContent"><i className="fa fa-paper-plane-o fa-2x"></i></Button>
                <br/>
                <textarea rows="2" cols="40" placeholder="tweet..." disabled={this.state.isControllable ? "" : "disabled"} value={this.state.editorText} onChange={this.onChangeTextArea.bind(this)}></textarea>
                {this.getRemainCount()}
            </div>
        );
    }

    onPostButtonClicked(e) {
        if (this.editorStore.editorText() && this.editorStore.remainTextCount() > -1) {
            let options = {
                type: "info",
                buttons: ["書き込む", "やめる"],
                title: "投稿",
                message: "以下の内容で書き込みます。よろしいですか?",
                detail: this.editorStore.editorText()
            };
            this.dialog.showMessageBox(remote.getCurrentWindow(), options, (e) => {
                if (e == 0) {
                    ViewDispatcher.dispatch({
                        actionType: EditorConstants.POST_TWEET,
                        tweet: this.editorStore.editorText(),
                        media: this.editorStore.mediaList().map((media) =>{
                            return media.media_id;
                        })
                    });
                }
            });
        }
    }

    onMediaButtonClicked(e) {
        let options = {};
        this.dialog.showOpenDialog(remote.getCurrentWindow(), options, (e) => {
            ViewDispatcher.dispatch({
                actionType: EditorConstants.UPLOAD_MEDIA,
                path: e[0]
            });
        });
    }

    onChangeTextArea(e) {
        ViewDispatcher.dispatch({
            actionType: EditorConstants.CHANGE_TEXTAREA,
            text: e.target.value
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
