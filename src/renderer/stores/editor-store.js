import ActionDispatcher from '../dispatcher/action-dispatcher'
import EditorConstants from '../constants/editor-constants'
import TwitterClientConstants from '../constants/twitter-client-constants'
import StoreBase from './store-base'

export default class EditorStore extends StoreBase {
    constructor() {
        super();

        this._isActiveEditor = false;
        this._isControllable = false;
        this._editorText = "";

        ActionDispatcher.register((action) => {
            switch(action.actionType) {
                case EditorConstants.OPEN_EDITOR:
                    this._isActiveEditor = true;
                    this._isControllable = true;
                    this.emitChange();
                    break;

                case EditorConstants.CLOSE_EDITOR:
                    this._isActiveEditor = false;
                    this._isControllable = false;
                    this.emitChange();
                    break;

                case EditorConstants.POST_TWEET:
                    this._isControllable = false;
                    this.emitChange();
                    break;

                case EditorConstants.CHANGE_TEXTAREA:
                    this._editorText = action.text;
                    this.emitChange();
                    break;

                case TwitterClientConstants.POST_COMPLETED:
                    console.log("kitade-");
                    this._editorText = "";
                    this._isControllable = true;
                    this.emitChange();
                    break;

                default:
                    break;
            }
        });
    }

    isActiveEditor() {
        return this._isActiveEditor;
    }

    isControllable() {
        return this._isControllable;
    }

    editorText() {
        return this._editorText;
    }
}