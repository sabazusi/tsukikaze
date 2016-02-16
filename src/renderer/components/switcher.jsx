import React from 'react'
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import ViewDispatcher from '../dispatcher/view-dispatcher'
import SwitcherConstants from '../constants/switcher-constants'
import Editor from './editor'

export default class Switcher extends React.Component {
    constructor() {
        super();
        this.state = {
            homeTimelineEnabled: true,
            mentionEnabled: false,
            directMessageEnabled: false
        }
    }

    render() {
        return (
            <div className="switcher">
                <Editor stores={this.props.stores}/>
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button active={this.state.homeTimelineEnabled} onClick={this.showHomeTimeline.bind(this)} bsSize="small">Timeline</Button>
                        <Button active={this.state.mentionEnabled} onClick={this.showMention.bind(this)} bsSize="small">Mention</Button>
                        <Button active={this.state.directMessageEnabled} onClick={this.showDirectMessage.bind(this)} bsSize="small">DM</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        );
    }

    showHomeTimeline(e) {
        this.setState({
            homeTimelineEnabled: true,
            mentionEnabled: false,
            directMessageEnabled: false
        });
        ViewDispatcher.dispatch({
            actionType: SwitcherConstants.HOME_TIMELINE_SELECTED
        });
    }

    showMention(e) {
        this.setState({
            homeTimelineEnabled: false,
            mentionEnabled: true,
            directMessageEnabled: false
        });
        ViewDispatcher.dispatch({
            actionType: SwitcherConstants.MENTION_SELECTED
        });
    }

    showDirectMessage(e) {
        this.setState({
            homeTimelineEnabled: false,
            mentionEnabled: false,
            directMessageEnabled: true
        });
        ViewDispatcher.dispatch({
            actionType: SwitcherConstants.DIRECT_MESSAGE_SELECTED
        });
    }
}
