import electronWindow from 'electron-window'
import path from 'path'

export default class MainWindow
{
    constructor(storage) {
        this.storage = storage;
        /**
        if (!storage.getWindowSize()) {
            storage.storeWindowSize(400, 700);
        }
        let size = storage.getWindowSize();
        let windowProperty = {
            width: size.width,
            height: size.height,
            frame: true
        };
         */
        let windowProperty = {
            width: 400,
            height: 700,
            frame: true
        };
        windowProperty["min-width"] = 400;
        windowProperty["min-height"] = 400;

        this._window = electronWindow.createWindow(windowProperty);
        this.show();
        this._window.on("resize", (e)=> {
            this.send("resize", this._window.getSize());
        });
    }

    show() {
        let renderFilePath = path.resolve(__dirname, '../../', 'renderer', 'main.html');
        this._window.showUrl(renderFilePath, {}, () => {
            console.log('window created.');
        });
    }

    send(...args) {
        this._window.webContents.send(...args);
    }
}
