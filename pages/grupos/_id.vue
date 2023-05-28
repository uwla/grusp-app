<template>
    <main class="w700">
        <grupo-view :grupo="grupo" />
    </main>
</template>

<script>
export default {
    async asyncData({ $axios, params }) {
        const id = params.id
        const url = `http://localhost:8000/api/public/grupos/${id}`
        const grupo = (await $axios.get(url)).data
        const data = {
            grupo
        }
        return data
    },
    mounted() {
        console.log(this.grupo)
    }
}
</script>
