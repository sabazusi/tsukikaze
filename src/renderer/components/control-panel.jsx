import React from 'react'

export default class ControlPanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="controlPanel">
                <button><i className="fa fa-paper-plane fa-5x"></i></button>
                <button><i className="fa fa-plus-circle fa-3x"></i></button>
                <button><i className="fa fa-at fa-3x"></i></button>
                <button><i className="fa fa-envelope fa-3x"></i></button>
                <button><i className="fa fa-gear fa-3x"></i></button>
                <button><i className="fa fa-repeat fa-3x"></i></button>
            </div>
        );

    }
}