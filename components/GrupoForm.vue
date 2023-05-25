<template>
    <div>
        <!-- ERROR LIST -->
        <message-errors v-if="showErrors"
            :errors="errors" @hide="hideErrors()" />

        <!-- SUCCESS MESSAGE -->
        <message-success v-if="showSuccess"
            :message="successMessage" @hide="hideSuccess()" />

        <!-- FORM -->
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
                <input id="img" ref="img" type="file" @change="updateImg()">
            </div>
            <div class="form-field">
                <label>Tags</label>
                <multiselect v-bind="params" v-model="tags" />
            </div>
            <div class="form-buttons">
                <button type="reset">RESETAR</button>
                <button type="submit">ENVIAR</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            titulo: "",
            descricao: "",
            img: null,
            tags: [],
            errors: [],
            showSuccess: false,
        }
    },

    computed: {
        // these are the parameters for the vue multiselect
        params() {
            return this.$store.getters['grupo/multiselectParams']
        },

        showErrors() {
            return this.errors.length > 0
        }
    },

    mounted() {
        // initialize the values
        this.titulo = this.grupo.titulo ?? ""
        this.descricao = this.grupo.descricao ?? ""
        this.tags = this.grupo.tags ?? []
    },

    methods: {
        updateGrupo() {
            const { titulo, descricao, tags, img, method, url } = this
            const formData = new FormData()

            // append string fields
            formData.append('titulo', titulo)
            formData.append('descricao', descricao)
            formData.append('_method', method)

            // append file
            if (img != null) formData.append('img', img)

            // append tag array
            tags.forEach(t => formData.append('tags[]', t))

            // request headers
            const token = this.$auth.strategy.token.get()
            const headers = {
                'Authorization': token,
                'Content-Type': 'multipart/form-data',
            }

            this.$axios.post(url, formData, { headers })
                .then(res => {
                    this.hideErrors()
                    this.showSuccess = true
                    console.log(res.data)
                })
                .catch(e => {
                    this.handleErrors(e.response.data.errors)
                })
        },

        updateImg() {
            this.img = this.$refs.img.files[0];
        },

        hideErrors() {
            this.errors = []
        },

        hideSuccess() {
            this.showSuccess = false
        },

        handleErrors(errorsObj) {
            const errors = []
            for (let field in errorsObj)
                for (let errorMessage of errorsObj[field])
                    errors.push(errorMessage)
            this.errors = errors
        },
    },

    props: {
        grupo: Object,
        url: String,
        method: String,
        successMessage: String,
    }
}
</script>
