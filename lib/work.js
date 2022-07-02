const path = require('path');
const fs = require('fs');

class Worker {
    static htmlCode = {
        head_begin: `<!DOCTYPE html>\n<html lang="en">\n<head>`,
        head_end: `<meta charset="UTF-8">\n<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Document</title>`,
        body_begin: `</head>\n<body>`,
        body_end: `\n</body>\n</html>`
    }
    static injectType = {
        style: "style",
        script: "script",
    }
    constructor(inputDirPath, outFilePath) {
        this.dirPath = inputDirPath;
        this.filePath = outFilePath;
        this.create();
    }
    create() {
        this.html;
        this.style = '';
        this.script = '';
        this.workList = [() => this.load(), () => this.render()];
        return this;
    }
    exportDataHanler = (exports) => {
        // console.log(this);奇怪的问题，应该是this对像丢失
        switch (typeof exports) {
            case "string":
                return exports;
            case "function":
                const functionName = exports.constructor.name;
                return functionName === "AsyncFunction" ? exports().then(exports => this.exportDataHanler(exports)) : exports();
            case "object":
                const injectTypes = Object.keys(exports).filter(key => Worker.injectType[key]);
                injectTypes.forEach(injectName => {
                    this[injectName] += exports[injectName];
                });
                return exports.content;
            default:
                return exports;
        }
    }
    async load() {
        this.fileExports = fs.readdirSync(this.dirPath, { encoding: "utf-8" }).map(filename => require(path.join(this.dirPath, filename)));
        this.fileExportLoads = await Promise.allSettled(this.fileExports.map(this.exportDataHanler)).then(data => data.map(({ value }) => value));
        return this;
    }
    inject(name, data) {
        this[name] += data;
    }
    render() {
        this.html = [
            Worker.htmlCode.head_begin,
            Worker.htmlCode.head_end,
            `<style>${this.style}</style>`,
            Worker.htmlCode.body_begin,
            ...this.fileExportLoads,
            `<script>${this.script}</script>`,
            Worker.htmlCode.body_end,
        ]
        fs.writeFileSync(path.join(this.filePath), this.html.join('\n'));
        return this;
    }
    destory() {

    }
    async workflow() {
        const curryWorkList = [...this.workList, () => { console.log(`every work is finish`); }];
        while (curryWorkList.length !== 0) {
            const task = curryWorkList.shift();
            await task();
        }

    }
}
module.exports = Worker;