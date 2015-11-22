import React from 'react'
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'

export default class Switcher extends React.Component {
    constructor() {
        super();
        this.state = {
            active: [true, false, false]
        }
    }

    render() {
        return (
            <div className="switcher">
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button active={this.state.active[0]} onClick={this.showA.bind(this)} bsSize="small">Timeline</Button>
                        <Button active={this.state.active[1]} onClick={this.showB.bind(this)} bsSize="small">Mention</Button>
                        <Button active={this.state.active[2]} onClick={this.showC.bind(this)} bsSize="small">DM</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        );
    }

    showA(e) {
        this.setState({
            active: [true, false, false]
        });
    }

    showB(e) {
        this.setState({
            active: [false, true, false]
        });
    }

    showC(e) {
        this.setState({
            active: [false, false, true]
        });
    }
}
