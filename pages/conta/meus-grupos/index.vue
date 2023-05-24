<template>
    <main>
        <h1>MEUS GRUPOS</h1>
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>TITULO</th>
                    <th>TAGS</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="grupo,i in grupos" :key="i">
                    <td>{{ grupo.id }}</td>
                    <td>{{ grupo.titulo }}</td>
                    <td>{{ grupo.tags }}</td>
                    <td>BOTÕES DE AÇÃO...</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script>
export default {
    middleware: 'auth',
    async asyncData({ $auth, $axios }) {
        const url = "http://localhost:8000/api/account/grupos"
        const token = $auth.strategy.token.get()
        const headers = { 'Authorization' : token }
        const grupos = (await $axios.get(url, { headers }) ).data
        return {
            grupos
        }
    }
}
</script>
