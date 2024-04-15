<template>
    <main>
        <h1>MEUS GRUPOS</h1>
        <grupo-user-dashboard v-bind="{ grupos }" />
    </main>
</template>

<script>
export default {
    middleware: 'auth',
    async asyncData({ $axios }) {
        const url = '/account/grupos'
        const grupos = (await $axios.get(url)).data
        return {
            grupos: grupos,
        }
    },
}
</script>
