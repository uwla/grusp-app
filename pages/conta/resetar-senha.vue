<template>
    <main class="w500">
        <h1>RESETAR SENHA</h1>

        <p>Digite sua nova senha:</p>

        <message-success :show="showSuccess">
            SENHA ATUALIZADA!
        </message-success>

        <message-errors :errors="errors" @hide="hideErrors()" />

        <b-form class="form" @submit.prevent="resetPassword()">
            <b-form-group label="Nova senha" label-for="password">
                <b-form-input type="password" v-model="f.password" id="password" />
            </b-form-group>
            <b-form-group label="Confirmação de senha" label-for="password_confirmed">
                <b-form-input type="password" v-model="f.password_confirmation" id="password_confirmed" />
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
        const { token, email } = this.$route.query
        return {
            f: {
                password: "",
                password_confirmation: "",
                email,
                token,
            },
            isBusy: false,
            errors: [],
            showSuccess: false,
        }
    },

    methods: {
        resetPassword() {
            if (this.isBusy) return
            this.isBusy = true
            this.errors = []

            this.$axios.post('/account/password/reset', this.f)
                .then(() => {
                    this.f.password = ''
                    this.f.password_confirmation = ''
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
