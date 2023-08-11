<template>
    <main class="w700">
        <grupo-view :grupo="grupo" />
    </main>
</template>
<script>
export default {
    async asyncData({ $axios, params, store }) {
        // fetch user comments, so he can delete his own comments on the grupo
        await store.dispatch('grupo/fetchUserComments')

        // fetch the grupo itself
        const id = params.id
        const url = `/public/grupos/${id}`
        const grupo = (await $axios.get(url)).data

        // Store the grupo in vuex.  Since this page shows only one grupo, we
        // can set all grupos to be an array of just the current grupo
        store.commit('grupo/setGrupos', [grupo])

        return { grupoId: grupo.id }
    },
    computed: {
        grupo() {
            return this.$store.state.grupo.grupos.find(g => g.id == this.grupoId)
        }
    },
}
</script>
