import React from 'react'
import ViewDispatcher from '../dispatcher/view-dispatcher'

export default class TweetOption extends React.Component {
    constructor() {
        super();
    }

    onFavClicked() {
        ViewDispatcher.dispatch({
            actionType: ""
        });
    }

    onRetweetClicked() {
        ViewDispatcher.dispatch({
            actionType: ""
        });
    }

    onMentionClicked() {
        ViewDispatcher.dispatch({
            actionType: ""
        });
    }

    onDMClicked() {
        ViewDispatcher.dispatch({
            actionType: ""
        });
    }

    render() {
        return (<div>
                    <button>hoge</button>
                </div>);
    }
}