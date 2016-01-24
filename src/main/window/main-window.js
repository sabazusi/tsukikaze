import electronWindow from 'electron-window'
import path from 'path'

export default class MainWindow
{
    constructor(width, height) {
        this.windowProperty = {
            width: width,
            height: height,
            frame: true
        };
        this.windowProperty["min-width"] = 400;
        this.windowProperty["min-height"] = 400;

        /**
        this._window.on("resize", (e)=> {
            this.send("resize", this._window.getSize());
        });
         */
    }

    start() {
        this._window = electronWindow.createWindow(this.windowProperty);
        let renderFilePath = path.resolve(__dirname, '../../', 'renderer', 'main.html');
        this._window.showUrl(renderFilePath, {}, () => {
            console.log('window created.');
        });
    }

    send(...args) {
        this._window.webContents.send(...args);
    }
}
