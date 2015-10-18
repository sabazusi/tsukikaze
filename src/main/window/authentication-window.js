import electronWindow from 'electron-window'

export default class MainWindow
{
    constructor() {
        const windowProperty = 
        {
            width: 400,
            height: 500,
            frame: false,
            resizable: false
        };

        this._window = electronWindow.createWindow(windowProperty);
    }

    show () {
        this._window.showUrl("");
    }
}
