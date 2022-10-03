import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import config from "./config-key.js"

// Your web app's Firebase configuration
const fconfig = config();
//console.log("fconfig",fconfig);
// Initialize Firebase
const app = initializeApp(fconfig, 'users-rtdb');
const rdb = getDatabase(app);

export { rdb }
