import React from 'react'

export default class PreLoad extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
                <div className="application">
                    <div className="preLoading">
                        <img src="../../resources/loading.gif"/>
                    </div>
                    <div className="dummyTweetList">
                        <div className="dummyTweet">
                        </div>
                    </div>
                </div>
               );
    }
}
