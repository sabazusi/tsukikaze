import fs from 'fs'

export default class BrowserProcessStorage {
    constructor() {
        this.available = true;
        this.fileName = ".browser-storage.json";
        this._storage = {};
        this.data = "a";

        new Promise((resolve, reject) => {
            fs.accessSync(this.fileName, fs.R_OK & fs.W_OK, (error) => {
                if (error) {
                    this.data = "c";
                } else {
                    resolve();
                }
            });
        }).catch((e) => {
                console.log("aaaaa");
                this.data = "c";
            }
        ).then(() => {
                this.data = "b";
            }
        );
        /**
        try {
            fs.accessSync(this.fileName, fs.R_OK & fs.W_OK, (error) => {
                fs.readFileSync(this.fileName, "utf8", (error, data) => {
                    this.imp();
                    this.data = this.fileName;
                    this._storage = JSON.parse(data);
                });
            });
        } catch(e) {
            fs.writeFileSync(this.fileName, JSON.stringify({}), "utf8", (error) => {
                if (error) {
                    this.available = false;
                } else {
                    this._storage = {};
                }
            });
        }

         */
        console.log("hai...");
        console.log(this.data);

        /**
        fs.access(this.fileName, fs.R_OK & fs.W_OK, (error) => {
            fs.writeFile(this.fileName, JSON.stringify({}), "utf8", (error) => {
                if (error) {
                    this.available = false;
                } else {
                    // file 新規作成
                    this.import();
                }
            });

            fs.readFileSync(this.fileName, "utf8", (error, data) => {
                let fileContent;
                if (error) {
                    fileContent = "{}";
                } else {
                    fileContent = data;
                }
                this._storage = JSON.parse(fileContent);
            });
        });
         */

    }
    imp() {
        this.data = "b";
    }

    getWindowSize() {
        if(this.available && this._storage.windowWidth && this._storage.windowHeight){
            return {width: this._storage.windowWidth, height: this._storage.windowHeight};
        } else {
            return undefined;
        }
    }

    storeWindowSize(width, height) {
        if(this.available && width && height) {
            this._storage.windowWidth = width;
            this._storage.windowHeight = height;

            this._flush();
        }
    }

    _flush() {
        if (this.available)
        {
            let file = fs.openSync(this.fileName, "w");
            fs.writeSync(file, JSON.stringify(this._storage), 0);
            fs.closeSync(file);
        }
    }
}