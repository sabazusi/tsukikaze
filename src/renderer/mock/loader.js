import { EventEmitter } from 'events'
import Fs from 'fs'
import Path from 'path'

export default class MockDataLoader extends EventEmitter
{
	constructor()
	{
		super();
	}

	load()
	{
		var filePath = Path.normalize(__dirname + "/assets/dummy_timeline.json");
		console.log("-----------");
		console.log(filePath);
		Fs.access(filePath, function(error)
					{
						if (error)
						{
							console.log("error");
						}
						console.log("ok");
					}
				);
	}
}
