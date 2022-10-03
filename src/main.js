import loaders from "./loaders/loaders.js"
import config from 'config'
import chalk from 'chalk'
import listener from "./listener/listener.js"

const user_dev = config.get('user_dev') 

console.log("🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱");
console.log("  🟥🔷 E2A widget");
console.log("  {}🟪 CREATOR (v 1.0)");
console.log("🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱");

console.log(chalk.yellow.bold(`👨‍💻 Olá ${user_dev.name}!`));

listener.init()