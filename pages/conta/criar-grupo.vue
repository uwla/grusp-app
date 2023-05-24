<template>
    <main class="w700">
        <h1>REGISTRAR GRUPO</h1>

        <message-errors v-if="errors.length > 0" :errors="errors" @hide="hideErrors()" />

        <form class="form" @submit.prevent="createGrupo()">
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
            <div class="form-buttons">
                <button type="reset">RESETAR</button>
                <button type="submit">REGISTRAR</button>
            </div>
        </form>
    </main>
</template>

<script>
export default {
    middleware: 'auth',

    data() {
        return {
            titulo: "",
            descricao: "",
            img: null,
            errors: [],
        }
    },

    methods: {
        createGrupo() {
            const formData = new FormData()
            formData.append('titulo', this.titulo)
            formData.append('descricao', this.descricao)
            if (this.img != null) formData.append('img', this.img)

            const token = this.$auth.strategy.token.get()
            const url = 'http://localhost:8000/api/grupo'
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
    }
}
</script>
