import Fs from 'fs'
import Path from 'path'

export default class MockDataLoader
{
	constructor()
	{
	}

	load(emitter)
	{
		var filePath = Path.normalize(__dirname + "/assets/dummy_timeline.json");
		Fs.access(filePath, function(error)
					{
						if (error)
						{
							console.log("error");
						}
						else
						{
							Fs.readFile(filePath, function(error, data)
								{
									emitter.emit("dummy_data_loaded", JSON.parse(data));
								});
						}
					}
				);
	}
}
