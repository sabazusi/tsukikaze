import ActionDispatcher from '../dispatcher/action-dispatcher'
import EditorConstants from '../constants/editor-constants'
import StoreBase from 'store-base'

export default class EditorStore extends StoreBase {
    constructor() {
        super();

        this.isActiveEditor = false;
        this.isControllable = false;
        this.editorText = "";

        ActionDispatcher.register((action) => {
            switch(action.actionType) {
                case EditorConstants.OPEN_EDITOR:
                    this.isActiveEditor = true;
                    this.isControllable = true;
                    this.emitChange();
                    break;

                case EditorConstants.CLOSE_EDITOR:
                    this.isActiveEditor = false;
                    this.isControllable = false;
                    this.emitChange();
                    break;

                case EditorConstants.POST_TWEET:
                    this.isControllable = false;
                    this.emitChange();
                    break;

                default:
                    break;
            }
        });
    }

    isActiveEditor() {
        return this.isActiveEditor;
    }

    isControllable() {
        return this.isControllable;
    }

    editorText() {
        return this.editorText();
    }
}