import BrowserWindow from 'browser-window'

export default class MainWindow
{
	constructor()
	{
		const windowProperty = 
		{
			width: 400,
			height: 700,
			frame: false,
			resizable: false
		};
		const renderFilePath = "file://" + __dirname + "/../../renderer/mock/main.html";

		this.window = new BrowserWindow(windowProperty);

		this.window.loadUrl(renderFilePath);

		this.window.on('closed', () =>
		{
			this.window = null;
		});
	}
}
