import Fs from 'fs'

class MediaUtil {
    constructor() {
    }

    getMediaByFilePath(path) {
        let file = Fs.readFileSync(path);
        return new Buffer(file).toString("base64");
    }
}

export default new MediaUtil();
