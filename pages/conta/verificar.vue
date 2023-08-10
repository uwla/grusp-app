<template>
    <main class="w500">
        <div v-if="verified">
           <h1>VERIFICAÇÃO CONCLUÍDA</h1>
           <p>Sua conta foi verifica com sucesso.</p>
           <p>Você pode fechar esta página agora.</p>
        </div>
        <div v-else>
            <h1>VERIFICAÇÃO FALHOU</h1>
            <p>Não foi possível verificar sua conta.</p>
            <p>
                É possível que o link de verificação tenha expirado,
                portanto solicite um novo link.
            </p>
        </div>
    </main>
</template>
<script>
export default {
    async asyncData({ route, $axios }) {
        // get the parameters for the request
        const { id, hash, signature, expires } = route.query

        // build the verification request URL
        const url = `/account/verify/${id}/${hash}?expires=${expires}&signature=${signature}`

        // verification status
        let status

        // send a verification request
        await $axios.get(url)
            .then(response => status = response.data.status || 'error')
            .catch(() => status = 'error')

        // store the status
        return { status }
    },

    computed: {
        verified() {
            return this.status === 'verified'
        }
    },
}
</script>
