import React from 'react'
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import ViewDispatcher from '../dispatcher/view-dispatcher'
import SwitcherConstants from '../constants/switcher-constants'

export default class Switcher extends React.Component {
    constructor() {
        super();
        this.state = {
            homeTimelineEnabled: true,
            mentionEnabled: false,
            directMailEnabled: false
        }
    }

    render() {
        return (
            <div className="switcher">
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button active={this.state.homeTimelineEnabled} onClick={this.showHomeTimeline.bind(this)} bsSize="small">Timeline</Button>
                        <Button active={this.state.mentionEnabled} onClick={this.showMention.bind(this)} bsSize="small">Mention</Button>
                        <Button active={this.state.directMailEnabled} onClick={this.showDirectMail.bind(this)} bsSize="small">DM</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        );
    }

    showHomeTimeline(e) {
        this.setState({
            homeTimelineEnabled: true,
            mentionEnabled: false,
            directMailEnabled: false
        });
        ViewDispatcher.dispatch({
            actionType: SwitcherConstants.HOME_TIMELINE_SELECTED
        });
    }

    showMention(e) {
        this.setState({
            homeTimelineEnabled: false,
            mentionEnabled: true,
            directMailEnabled: false
        });
        ViewDispatcher.dispatch({
            actionType: SwitcherConstants.MENTION_SELECTED
        });
    }

    showDirectMail(e) {
        this.setState({
            homeTimelineEnabled: false,
            mentionEnabled: false,
            directMailEnabled: true
        });
        ViewDispatcher.dispatch({
            actionType: SwitcherConstants.DIRECT_MAIL_SELECTED
        });
    }
}
