import { updateDDns } from "./updateArmy.js";
import { updateDnspod } from "./updateDnspod.js";
import fs from "node:fs";
import util from "node:util";

const log_file = fs.createWriteStream("./debug.log", { flags: 'w' });
const log_stdout = process.stdout;

console.log = (d) => {
    const content = `${new Date().toLocaleString('zh-CN')} ${util.format(d)}\n`
    log_file.write(content);
    log_stdout.write(content);
};

console.log(await updateDDns())
console.log(await updateDnspod())