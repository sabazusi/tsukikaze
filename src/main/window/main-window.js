import electronWindow from 'electron-window';
import path from 'path';
import IpcConstants from '../../utils/constants/ipc-constants';

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
    }

    start() {
        this._window = electronWindow.createWindow(this.windowProperty);
        let renderFilePath = path.resolve(__dirname, '../../', 'renderer', 'main.html');
        this._window.showUrl(renderFilePath, {}, () => {
            console.log('window created.');
        });

        this._window.on("resize", (e)=> {
            let newSize = this._window.getSize();
            this.send(IpcConstants.UPDATE_WINDOW_SIZE, newSize[0], newSize[1]);
        });
    }

    send(...args) {
        this._window.webContents.send(...args);
    }
}
