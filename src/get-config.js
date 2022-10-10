import appRoot from 'app-root-path'
import { readFileSync } from 'fs'
import chalk from 'chalk'

export default function() {
    let path = appRoot.path + "/creator.config.json"
    //console.log('path',path);

    try {
        let data = readFileSync(path, { encoding: 'utf8' })
        let config = JSON.parse(data)
        return config
    } catch (error) {
        if (error.code == 'ENOENT') {
            console.log('🙁 ' + chalk.red.bold(`[creator.config.json] não encontrado!`));
            return null
        } else {
            console.log(`[${path}] ERRO desconhecido!`);
            return null
        }
    }
    
}