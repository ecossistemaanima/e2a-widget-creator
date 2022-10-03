import { readFileSync } from 'fs'
import appRoot from 'app-root-path'

//console.log("root directory:", appRoot.path);

export default { 

    async read(filePath) {
        try {
            let data = readFileSync(appRoot.path + filePath,{encoding:'utf8'})
            return data
        } catch (error) {
            if(error.code == 'ENOENT') {
                console.log(`[${filePath}] não encontrado!`);
            } else {
                console.log(`[${filePath}] ERRO desconhecido!`);
            }
        }
    }
}