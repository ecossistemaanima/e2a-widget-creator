import chokidar from 'chokidar'
import config from 'config'
import appRoot from 'app-root-path'
import chalk from 'chalk'
import { parseComponent } from 'vue-sfc-parser'
import { readFileSync } from 'fs'
import widget_model from '../e2aWidget/models/widget-model.js'

const cfg_widgets = config.get('widgets')
const path = appRoot.path + "/" + cfg_widgets.folder
//console.log("path:", path);

const listener = {

    init() {
        const watcher = chokidar.watch(path, {
            persistent: true
        });
        watcher
            .on('change', (path, stats) => {
                let path_names = path.split(`/${cfg_widgets.folder}/`)
                //console.log(path_names)
                listener.fileChange(path, path_names[1], stats.size)
            })
            console.log('📡 ' + chalk.green.bold(`escutando por widgets na pasta `)+cfg_widgets.folder);        
    },

    async read(filePath) {
        try {
            let data = readFileSync(filePath, { encoding: 'utf8' })
            return data
        } catch (error) {
            if (error.code == 'ENOENT') {
                console.log(`[${filePath}] não encontrado!`);
            } else {
                console.log(`[${filePath}] ERRO desconhecido!`);
            }
        }
    },

    async fileChange(path, fileName, size) {
        //console.log({path,fileName,size});
        console.log('👀 ' + chalk.blue.bold(`Opa! percebi algo...`));
        console.log('👀 ' + chalk.green.bold(`[${fileName}] alterado...`));
        let data = await listener.read(path)
        //console.log("data", data);
        const res = parseComponent(data)
        if (res.template == null) {
            console.log('🙁 ' + chalk.red.bold(`erro ao interpretar template...`));
            return
        }
        let template = res.template.content.trim()
        //console.log(template)
        if (res.script != null) {
            //console.log(res.script.content)
            let tokens = res.script.content.split('export default')
            let script = tokens[1].trim()
            //console.log(script);
            try {
                let func = new Function('args', `return ` + script)
                let scriptObj = func()
                //console.log('scriptObj', scriptObj);
                let widget_info = listener.getWidgetInfo(scriptObj)
                listener.publish_widget(widget_info, template, script)
            } catch (e) {
                console.log('🙁 ' + chalk.red.bold(`Ohh não! script com erro...`));
                console.log(chalk.blue(e.name) + ': ' + chalk.red(e.message));
            }
        } else {
            console.log('🙁 ' + chalk.red.bold(`erro ao interpretar script...`));
        }
    },

    getWidgetInfo(scriptObj) {
        let widget_info = scriptObj.widget
        if (widget_info == undefined) {
            console.log('🙁 ' + chalk.red.bold(`informações do widget não encontradas...`));
            console.log('🤔 ' + chalk.blue(`você adicionou o atributo [widget] no component?`));
            return widget_info
        }
        if (widget_info.name == undefined) {
            console.log('🙁 ' + chalk.red.bold(`nome do widget não encontrado...`));
            console.log('🤔 ' + chalk.blue(`você adicionou o atributo [name] p/ o widget?`));
            return widget_info
        }
        if (widget_info.id == undefined) {
            console.log('🙁 ' + chalk.red.bold(`id do widget não encontrado...`));
            console.log('🤔 ' + chalk.blue(`você adicionou o atributo [id] p/ o widget?`));
            return widget_info
        }
        console.log('👀 widget ' + chalk.green.bold(`[${widget_info.id}] [${widget_info.name}] encontrado...`));
        return widget_info
    },

    async publish_widget(widget_info, template, script) {
        //console.log({ widget_info, template, script });
        let path = 'widgets/'+widget_info.id
        //console.log('path',path);
        let widget = await widget_model.get(path)
        if(widget == null) {
            console.log('👀 widget ' + chalk.green.bold(`[${widget_info.id}] [${widget_info.name}] PRIMEIRA VERSÃO`));
            let user_dev = config.get('user_dev')
            let devs = {}
            devs[user_dev.id] = user_dev
            let widget = {
                id: widget_info.id,
                name: widget_info.name,
                version: 1,
                prod: false,
                devs,
                template,
                script               
            }
            await widget_model.set(path,widget)
            console.log('🚀 widget ' + chalk.green.bold(`[${widget_info.id}] [${widget_info.name}] PUBLICADO!`));
            let path_user = 'users_devs/'+user_dev.id+'/'+widget.id
            await widget_model.set(path_user,widget.id)
        } else {
            let backup_path = 'widgets_backup/'+widget.id+'/'+widget.version
            await widget_model.set(backup_path,widget)
            console.log('🗃️  widget antigo ' + chalk.green.bold(`[${widget.id}] [${widget.name}] backup versão ${widget.version} armazenado`));
            let devs = widget.devs
            if(devs == undefined) {
                devs = {}
            }
            let user_dev = config.get('user_dev')
            devs[user_dev.id] = user_dev
            if(widget.prod == undefined) {
                widget.prod = false
            }
            let widget_new = {
                id: widget_info.id,
                name: widget_info.name,
                version: widget.version+1,
                prod: widget.prod,
                devs,
                template,
                script               
            }
            await widget_model.set(path,widget_new)
            console.log('🚀 widget ' + chalk.green.bold(`[${widget_info.id}] [${widget_info.name}] versão ${widget_new.version} PUBLICADA!`));
            let path_user = 'users_devs/'+user_dev.id+'/'+widget_new.id
            await widget_model.set(path_user,widget_new.id)
        }
        console.log('📡 ' + chalk.green.bold(`escutando por widgets na pasta `)+cfg_widgets.folder);        
    }
}

export default listener