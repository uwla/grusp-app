<template>
    <main>
        <h1>MEUS GRUPOS</h1>

        <b-button variant="success" href="/conta/meus-grupos/criar">
            CRIAR GRUPO
        </b-button>
        <br/><br/>

        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>TITULO</th>
                    <th>TAGS</th>
                    <th class="text-center w-min">AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="grupo,i in grupos" :key="i">
                    <td>{{ grupo.titulo }}</td>
                    <td>
                        <grupo-tags :tags="grupo.tags" />
                    </td>
                    <td class="nowrap w-min">
                        <b-button variant="success" :href="`/grupos/${grupo.id}`">
                            <b-icon icon="eye" />
                        </b-button>
                        <b-button variant="primary" :href="`/conta/meus-grupos/editar/${grupo.id}`">
                            <b-icon icon="pencil" />
                        </b-button>
                    </td>
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
