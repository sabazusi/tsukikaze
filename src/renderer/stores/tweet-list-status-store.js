import StoreBase from './store-base'
import ActionDispatcher from '../dispatcher/action-dispatcher'
import SwitcherConstants from '../constants/switcher-constants'

export default class TweetListStatusStore extends StoreBase {

    constructor() {
        super();

        this.TIMELINE = "timeline";
        this.MENTION = "mention";
        this.DIRECTMAIL = "directMail";
        this._current = this.TIMELINE;

        ActionDispatcher.register((action) => {
            switch(action.actionType) {
                case SwitcherConstants.HOME_TIMELINE_SELECTED:
                    this._current = this.TIMELINE;
                    this.emitChange();
                    break;
                case SwitcherConstants.MENTION_SELECTED:
                    this._current = this.MENTION;
                    this.emitChange();
                    break;
                case SwitcherConstants.DIRECT_MAIL_SELECTED:
                    this._current = this.DIRECTMAIL;
                    this.emitChange();
                    break;
                default:
                    break;
            }
        });
    }

    homeTimelineEnabled() {
        return this._current == this.TIMELINE;
    }

    mentionEnabled() {
        return this._current == this.MENTION;
    }

    directMailEnabled() {
        return this._current == this.DIRECTMAIL;
    }
}
