import remote from 'remote';

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
            {label: 'todo: implement'}
        ]);
    }
}
