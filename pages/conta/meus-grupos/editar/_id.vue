<template>
    <main class="w700" style="min-height: 120vh">
        <h1>EDITAR GRUPO</h1>

        <message-errors v-if="errors.length > 0" :errors="errors" @hide="hideErrors()" />

        <form class="form" @submit.prevent="updateGrupo()">
            <div class="form-field">
                <label for="titulo">Título</label>
                <input type="text" id="titulo" v-model="titulo">
            </div>
            <div class="form-field">
                <label for="descricao">Descrição</label>
                <textarea rows="5" id="descricao" v-model="descricao" />
            </div>
            <div class="form-field">
                <label for="img">Imagem</label>
                <input id="img" ref="img" type="file" @change="updateCoverImage()">
            </div>
            <div class="form-field">
                <label>Tags</label>
                <multiselect v-bind="params" v-model="tags" />
            </div>
            <div class="form-buttons">
                <button type="reset">RESETAR</button>
                <button type="submit">ATUALIZAR</button>
            </div>
        </form>
    </main>
</template>

<script>
export default {
    middleware: 'auth',

    async asyncData({ store, params, $axios, $auth }) {
        const id = params.id
        await store.dispatch('grupo/fetchTags')
        const url = `http://localhost:8000/api/grupo/${id}`
        const token = $auth.strategy.token.get()
        const headers = { 'Authorization' : token }
        const grupo = (await $axios.get(url, { headers }) ).data

        // then
        return {
            id: id,
            grupo: grupo,
            tags: grupo.tags,
            titulo: grupo.titulo,
            descricao: grupo.descricao,
            img: null,
            errors: [],
        }
    },

    computed: {
        // these are the parameters for the vue multiselect
        params() {
            return this.$store.getters['grupo/multiselectParams']
        },
    },

    methods: {
        updateGrupo() {
            const formData = new FormData()
            formData.append('titulo', this.titulo)
            formData.append('descricao', this.descricao)
            formData.append('_method', 'put')
            if (this.img != null) formData.append('img', this.img)
            this.tags.forEach(t => formData.append('tags[]', t))

            const id = this.id
            const token = this.$auth.strategy.token.get()
            const url = `http://localhost:8000/api/grupo/${id}`
            const headers = {
                'Authorization': token,
                'Content-Type': 'multipart/form-data',
            }

            this.$axios.post(url, formData, { headers })
                .then(res => {
                    console.log(res.data)
                })
                .catch(e => {
                    this.handleErrors(e.response.data.errors)
                })
        },
        updateCoverImage() {
            this.img = this.$refs.img.files[0];
        },
        hideErrors() {
            this.errors = []
        },
        handleErrors(errorsObj) {
            const errors = []
            for (let field in errorsObj)
                for (let errorMessage of errorsObj[field])
                    errors.push(errorMessage)
            this.errors = errors
        },
    },
    mounted() {
        console.log(this.grupo)
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
