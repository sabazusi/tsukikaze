import MainWindow from './window/main-window.js'
import app from 'app'

export default class MainApplication
{
	constructor()
	{
		this.window = null;
	}

	start()
	{
		app.on('ready', this._onReady.bind(this));
	}

	_onReady()
	{
		this.window = new MainWindow();
	}
}
