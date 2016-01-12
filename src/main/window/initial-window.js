import electronWindow from 'electron-window'
import path from 'path'

export default class InitialWindow {
    constructor() {
        let windowProperty = {
            width: 300,
            height: 300,
            frame: false,
            resizable: false
        }

        this._window = electronWindow.createWindow(windowProperty);
        let renderFilePath = path.resolve(__dirname, '../../', 'renderer', 'initial.html');
        this._window.showUrl(renderFilePath, {}, () => {
            console.log(' initial window created.');
        });
    }
}
