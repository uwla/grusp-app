<template>
    <main>
        <h1>{{ grupo.titulo }}</h1>
        <p>{{ grupo.descricao }}</p>
        <ul>
            <li v-for="tag,i in grupo.tags" :key="i">
                {{ tag }}
            </li>
        </ul>
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
    }
}
</script>
