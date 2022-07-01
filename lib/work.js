const path = require('path');
const fs = require('fs');

class Worker {
    constructor(inputDirPath, outFilePath) {
        this.dirPath = inputDirPath;
        this.filePath = outFilePath;
        this.create();
    }
    create() {
        this.workList = [() => this.load(), () => this.render()];
        return this;
    }
    async load() {
        this.fileExports = fs.readdirSync(this.dirPath, { encoding: "utf-8" }).map(filename => require(path.join(this.dirPath, filename)));

        this.fileExportLoads = await Promise.allSettled(this.fileExports.map(exports => {
            switch (typeof exports) {
                case "string":
                    return exports;
                case "function":
                    return exports();
                default:
                    return exports;
            }
        })).then(data => data.map(({ value }) => value));
        return this;
    }
    render() {
        fs.writeFileSync(path.join(this.filePath), this.fileExportLoads.join('\n\n'),);
        return this;
    }
    destory() {

    }
    async workflow() {
        // function* genWorkTask() {
        //     const curryWorkList = [...this.workList, () => { console.log(`every work is finish`); }];
        //     yield curryWorkList.pop();
        // }
        // const gen = genWorkTask();

        const curryWorkList = [...this.workList, () => { console.log(`every work is finish`); }];
        while (curryWorkList.length !== 0) {
            const task = curryWorkList.shift();
            await task();
        }

    }
}
module.exports = Worker;