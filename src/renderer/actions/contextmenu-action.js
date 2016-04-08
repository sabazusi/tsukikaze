import remote from 'remote';
import ActionDispatcher from '../dispatcher/action-dispatcher';
import ContextMenuConstants from '../constants/contextmenu-constants';

export default class ContextMenuAction {
    constructor() {
        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.setupContextMenu();
            switch(e) {
              default:
                  this.getContextMenu();
                  break;
            }
        });
    }

    getContextMenu() {
        this.textSelectedMenu.popup(remote.getCurrentWindow());
    }

    setupContextMenu() {
        const Menu = remote.require('menu');
        this.textSelectedMenu = Menu.buildFromTemplate([
            {
                label: 'コピー',
                accelerator: 'Command+C',
                click: () => {
                    ActionDispatcher.dispatch({
                        actionType: ContextMenuConstants.COPY_TEXT,
                        text: window.getSelection().toString()
                    });
                }
            }
        ]);
    }
}
