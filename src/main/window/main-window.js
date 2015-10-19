import electronWindow from 'electron-window'
import path from 'path'

export default class MainWindow
{
	constructor() {
		const windowProperty = 
		{
			width: 400,
			height: 700,
			frame: true,
			resizable: false
		};

		this._window = electronWindow.createWindow(windowProperty);
		this.show();
	}

	show() {
		const renderFilePath = path.resolve(__dirname, '../../', 'renderer', 'main.html');
		this._window.showUrl(renderFilePath, {}, function() {
			console.log('window created.');
		});
	}

	send(...args) {
		this._window.webContents.send(...args);
	}
}
