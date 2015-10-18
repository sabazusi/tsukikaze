import MainWindow from './window/main-window.js'
import AuthenticationWindow from './window/authentication-window.js'
import app from 'app'
import ipc from 'ipc'

export default class MainApplication
{
	constructor() {
		this.window = null;
	}

	start() {
		ipc.on('need-authentication', this._authentication.bind(this));
		app.on('ready', this._onReady.bind(this));
	}

	_onReady() {
		this.mainWindow = new MainWindow();
	}

	_authentication() {
		console.log("authentication start.");

		this.authenticationWindow = new AuthenticationWindow();
		this.authenticationWindow.show();
	}
}
