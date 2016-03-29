import remote from 'remote';

export default class ContextMenuAction {
    constructor() {
        this.Menu = remote.require('menu');
        this.contextMenu = this.Menu.buildFromTemplate([
            {label: 'todo: implement'}
        ]);
        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            switch(e) {
              default:
                  this.getContextMenu();
                  break;
            }
        });
    }

    getContextMenu() {
        this.contextMenu.popup(remote.getCurrentWindow());
    }
}
