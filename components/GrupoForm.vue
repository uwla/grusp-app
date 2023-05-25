<template>
    <div>
        <!-- ERROR MESSAGE -->
        <message-errors :errors="errors" @hide="hideErrors()" />

        <!-- SUCCESS MESSAGE -->
        <message-success :show="showSuccess" @hide="hideSuccess()">
            {{ successMessage }}
        </message-success>

        <!-- FORM -->
        <form class="form" @submit.prevent="submitForm()">
            <b-form-group label="Título" label-for="titulo">
                <b-form-input type="text" v-model="titulo" id="titulo"/>
            </b-form-group>
            <b-form-group label="Descrição" label-for="descricao">
                <b-form-textarea v-model="descricao" id="descricao" rows="8"/>
            </b-form-group>
            <b-form-group label="Imagem Principal" label-for="img">
                <b-form-file v-model="img" id="img"/>
            </b-form-group>
            <b-form-group label="Tags">
                <multiselect v-bind="params" v-model="tags" />
            </b-form-group>
            <div class="form-buttons">
                <b-button variant="danger" type="reset">
                    RESETAR
                </b-button>
                <b-button variant="success" type="submit">
                    ENVIAR
                </b-button>
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

        submitForm() {
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
