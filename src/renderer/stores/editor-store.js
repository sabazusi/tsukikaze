import ActionDispatcher from '../dispatcher/action-dispatcher';
import EditorConstants from '../constants/editor-constants';
import TwitterClientConstants from '../constants/twitter-client-constants';
import StoreBase from './store-base';
import TweetOptionConstants from '../constants/tweet-option-constants';
import TwitterText from 'twitter-text';

class Media {
    constructor(media_id, path) {
        this.media_id = media_id;
        this.path = path;
    }
}

export default class EditorStore extends StoreBase {
    constructor() {
        super();

        this._isActiveEditor = false;
        this._isControllable = false;
        this._editorText = "";
        this._mediaList = [];

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
                    this._editorText = "";
                    this._isControllable = true;
                    this._mediaList = [];
                    this.emitChange();
                    break;

                case TweetOptionConstants.OPEN_MENTION:
                    if (action.screenName)
                    {
                        this._editorText = "@" + action.screenName + " ";
                        this._isActiveEditor = true;
                        this._isControllable = true;
                        this.emitChange();
                    }
                    break;

                case TweetOptionConstants.OPEN_DM:
                    if (action.screenName)
                    {
                        this._editorText = "D @" + action.screenName + " ";
                        this._isActiveEditor = true;
                        this._isControllable = true;
                        this.emitChange();
                    }
                    break;

                case TwitterClientConstants.MEDIA_UPLOADED:
                    this._mediaList.push(new Media(action.media_id, action.path));

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

    mediaList() {
        return this._mediaList;
    }

    remainTextCount() {
        return 140 - TwitterText.getTweetLength(this._editorText);
    }
}
