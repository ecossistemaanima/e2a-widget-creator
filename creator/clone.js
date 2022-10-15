import getConfig from './get-config.js'
import { clone } from 'widget-creator'

//console.log(process.argv);
//process.exit(1)
let namespace = 'no-namespace'
let id = 'no-id'
if(process.argv.length > 2) {
    namespace = process.argv[2] 
    if(process.argv.length > 3) {
        id = process.argv[3] 
    }    
}

let config = getConfig()
if (config == null) {
    console.log('sorry');
} else {
    clone.setPrefix('E2A')
    clone.setConfig(config)
    clone.init(namespace,id).then(()=> {
        process.exit(1)
    })
}