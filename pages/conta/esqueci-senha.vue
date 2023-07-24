<template>
    <main class="w500">
        <h1>RESETAR SENHA</h1>

        <p>
            Preencha o seguinte formulário para receber um link para resetar sua
            senha:
        </p>

        <message-success :show="showSuccess">
            EMAIL ENVIADO!
        </message-success>

        <message-errors :errors="errors" @hide="hideErrors()" />

        <b-form class="form" @submit.prevent="requestResetLink()">
            <b-form-group label="Email" label-for="email">
                <b-form-input type="text" v-model="email" id="email" />
            </b-form-group>
            <b-button block variant="success" type="submit">
                ENVIAR
            </b-button>
        </b-form>
    </main>
</template>
<script>
import { parseResponseErrors } from '../../utils'

export default {
    middleware: 'auth',
    auth: 'guest',

    data() {
        return {
            email: "",
            isBusy: false,
            errors: [],
            showSuccess: false,
        }
    },

    methods: {
        requestResetLink() {
            if (this.isBusy) return
            this.isBusy = true
            this.errors = []

            const { email } = this
            this.$axios.post('/account/password/link', { email })
                .then(() => {
                    this.email = ''
                    this.showSuccess = true
                    setTimeout(() => this.$router.push('/conta/entrar'), 1500)
                })
                .catch(e => {
                    this.showSuccess = false
                    this.errors = parseResponseErrors(e.response)
                })
                .finally(() => {
                    this.isBusy = false
                })
        },
        hideErrors() {
            this.errors = []
        }
    }
}
</script>
