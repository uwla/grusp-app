<template>
    <main class="w500">
        <h1>DELETAR GRUPO</h1>
        <b-link href="/meus-grupos">Voltar</b-link>
        <br />
        <br />
        <p>Para ter certeza que deseja deletar o grupo, digite sua senha:</p>
        <grupo-delete :grupo="grupo" />
    </main>
</template>

<script>
export default {
    middleware: 'auth',

    async asyncData({ $auth, $axios, params, store }) {
        await store.dispatch('grupo/fetchTags')
        const id = params.id
        const url = `/grupo/${id}`
        const grupo = (await $axios.get(url)).data
        return { grupo }
    },
}
</script>
