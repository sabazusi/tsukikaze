import remote from 'remote';

class ContextMenuFactory {
    constructor() {
        const Menu = remote.require('menu');

        this.textSelectedMenu = Menu.buildFromTemplate([
            {label: 'todo: implement'}
        ]);
    }

    getTextSelectedMenu() {
        return this.textSelectedMenu
    }
}
export default new ContextMenuFactory();
