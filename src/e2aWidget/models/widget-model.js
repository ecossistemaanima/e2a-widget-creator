import { rdb } from "./firebase/firebase.js"
import { ref, get, onValue, query, set } from "firebase/database";

const rdbmode = "dev" //"dev" //"prod"
const paths = {
    "prod": "/prod/",
    "dev": "/dev/"
}
const rdbref = (path) => { 
    //console.log("acessando...",paths[rdbmode]+path);
    return ref(rdb,paths[rdbmode]+path) 
}

export default {
    rdb,
    rdbref,

    async get(path) {
        let snap = await get(rdbref(path))
        return snap.val()
    },

    onValue(path,func) {
        onValue(rdbref(path), (snap) => {
            func(snap.val())
        })
    },
    
    async set(path,value) {
        await set(rdbref(path),value)
    }
    
}