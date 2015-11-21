import React from 'react'
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'

export default class Switcher extends React.Component {
    render() {
        return (
            <div className="switcher">
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button bsSize="small">Timeline</Button>
                        <Button bsSize="small">Mention</Button>
                        <Button bsSize="small">DM</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        );
    }
}
