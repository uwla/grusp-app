<template>
    <main class="w700" style="min-height: 120vh">
        <h1>EDITAR GRUPO</h1>
        <b-link href="/meus-grupos">Voltar</b-link>
        <br />
        <br />
        <grupo-form v-bind="formParams" />
    </main>
</template>

<script>
export default {
    middleware: 'auth',

    async asyncData({ $axios, params, store }) {
        // fetch tags for creating a grupo
        // these tags will be stored in our vuex store
        await store.dispatch('grupo/fetchTags')

        // fetch the Grupo
        const id = params.id
        const url = `/grupo/${id}`
        const grupo = (await $axios.get(url)).data

        // then
        return {
            formParams: {
                grupo: grupo,
                method: 'put',
                successMessage: 'Grupo atualizado!',
                url: url,
            },
        }
    },
}
</script>
