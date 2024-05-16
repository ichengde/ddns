import { updateDDns } from "./updateArmy.js";
import { updateDnspod } from "./updateDnspod.js";


console.log(await updateDDns())
console.log(await updateDnspod())