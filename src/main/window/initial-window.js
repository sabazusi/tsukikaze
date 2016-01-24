import electronWindow from 'electron-window'
import path from 'path'

export default class InitialWindow {
    constructor() {
        let windowProperty = {
            width: 300,
            height: 350,
            frame: false,
 //           resizable: false
            resizable: true
        };

        this._window = electronWindow.createWindow(windowProperty);
        let renderFilePath = path.resolve(__dirname, '../../', 'renderer', 'initial.html');
        this._window.showUrl(renderFilePath, {}, () => {
            console.log(' initial window created.');
        });
    }

    send(...args) {
        this._window.webContents.send(...args);
    }

    hide() {
        this._window.hide();
    }
}
