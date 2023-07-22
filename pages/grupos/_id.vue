<template>
    <main class="w700">
        <grupo-view :grupo="grupo" />
    </main>
</template>
<script>
export default {
    async asyncData({ $axios, params }) {
        const id = params.id
        const url = `/public/grupos/${id}`
        const grupo = (await $axios.get(url)).data
        return { grupo }
    },
}
</script>
