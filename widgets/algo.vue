<template>
    <div>
        <div class="border p-1 rounded m-1">
		    <div class="bg-gray-200 border p-2 rounded m-2">
				mensagem: {{msg}} 
				<button class="btn btn-xs" @click="fazAlgo">
					algo
				</button>
			</div>
		</div>
    </div>
</template> 
<script>
    export default {
        widget: {
            name: "um widget testando",
            id: "WG-TESTE",
			version: 1
        },
        data() {
            return {
                msg: 'oi gente'
            }
        },
        mounted() {
            console.log('oi gente!!!');
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
