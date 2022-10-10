<template>
    <div>
        <div :class="wind('border rounded m-2 p-1 bg-purple-500')"> 
            oi gente
        </div>
        <div class="border p-1 rounded m-1">
            <div class="bg-gray-200 border p-2 rounded m-2">
                mensagem: {{msg}} xxx
                <q-btn size="" color="red" @click="fazAlgo">
                    algoss
                </q-btn> 
            </div> 
        </div>
    </div>
</template> 
<script>
export default {
    widget: {
        name: "um widget testando",
        namespace: 'testes2',
        id: "WG-TESTE", 
        version: 1,
        commit: 'versão 3'
    },
    data() {
        return {
            msg: 'oi gente',
            wind: wg.utils.wind
        }
    },
    async mounted() {
        console.log('oi gente!!!');
        let gadgets = await wg.models.widget.get('gadgets')
        console.log('gadgets', gadgets);
        //console.log(wg.utils.wind);
    },
    methods: {
        fazAlgo() {
            console.log('fazAlgo')
        }
    }
}
</script>
<style>
</style>
