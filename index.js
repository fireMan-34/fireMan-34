const path = require('path');
const fs = require('fs');

const Worker = require('./lib/work');

const AUTHOR = "fireMan-34";

const PARTIAL_PATH = path.join(__dirname, "partial");
const README_FILE_PATH = path.join(__dirname, "README.md");

// const PARTIAL_FileNames = fs.readdirSync(PARTIAL_PATH, { encoding: "utf-8" });
// const PARTIAL_Files = Promise.allSettled(PARTIAL_FileNames.map(filename => require(path.join(PARTIAL_PATH, filename))).map(data => {
//     if (typeof data === "string") return data;
//     if (typeof data === "function") return data();
// })).then(
//     data => {
//         return data.value
//     }
// );
const worker = new Worker(PARTIAL_PATH, README_FILE_PATH);
worker.workflow();

