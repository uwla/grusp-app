<template>
    <div>
        <message-errors :errors="errors" @hide="hideErrors()"/>

        <message-success :show="showSuccess" @hide="hideSuccess()">
            Grupo deletado!
        </message-success>

        <form class="form" @submit.prevent="submitForm()">
            <b-form-group label="Senha" label-for="password">
                <b-form-input type="password" v-model="password" id="password" min="8" required />
            </b-form-group>
            <b-button block variant="danger" type="submit">
                DELETAR
            </b-button>
        </form>
    </div>
</template>

<script>
export default {
    middleware: 'auth',

    data() {
        return {
            password: "",
            errors: [],
            showSuccess: false,
            formBusy: false,
        }
    },

    computed: {
        showErrors() {
            return this.errors.length > 0
        }
    },

    methods: {
        submitForm() {
            if (this.formBusy) return
            this.formBusy = true
            this.errors = []
            this.showSuccess = false

            const url = `/grupo/${this.grupo.id}`;
            const data = {
                password: this.password,
                _method: "delete"
            }

            this.$axios.post(url, data)
                .then(res => {
                    this.hideErrors()
                    this.showSuccess = true
                    this.password = ""
                    setTimeout(() => this.$router.push('/meus-grupos'), 1500)
                })
                .catch(e => {
                    this.errors = parseResponseErrors(e.response)
                })
                .finally(() => this.formBusy = false)
        },

        hideErrors() {
            this.errors = []
        },

        hideSuccess() {
            this.showSuccess = false
        },
    },

    props: {
        grupo: Object
    }
}
</script>
