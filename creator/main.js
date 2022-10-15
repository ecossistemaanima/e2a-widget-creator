import getConfig from './get-config.js'
import { creator } from 'widget-creator'

let config = getConfig()
if (config == null) {
    console.log('sorry');
} else {
    creator.setPrefix('E2A')
    creator.setConfig(config)
    creator.init()
}

