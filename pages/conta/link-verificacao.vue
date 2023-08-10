<template>
    <main class="w400">
        <h1>ENVIAR LINK DE VERIFICAÇÃO</h1>

        <message-errors :errors="errors" @hide="hideErrors()" />

        <message-success :show="showSuccess" @hide="hideSuccess()">
            {{ message }}
        </message-success>

        <b-form class="form" @submit.prevent="requestVerificationLink()">
            <b-form-group label="Email" label-for="email">
                <b-form-input type="email" v-model="data.email" id="email" />
            </b-form-group>
            <b-form-group label="Confirmação de email" label-for="email_confirmation">
                <b-form-input type="email" v-model="data.email_confirmation" id="email_confirmation" />
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
    auth: 'guest',
    middleware: 'auth',
    data() {
        return {
            data: {
                email: '',
                email_confirmation: '',
            },
            formBusy: false,
            errors: [],
            showSuccess: false,
            message: 'LINK ENVIADO!',
        }
    },
    methods: {
        requestVerificationLink() {
            if (this.formBusy) return
            this.formBusy = true

            this.$axios.post('/account/verify_link', this.data)
                .then(() => {
                    this.showSuccess = true
                    setTimeout(() => this.$router.push('/'), 3000);
                    this.data.email = ''
                    this.data.email_confirmation = ''
                })
                .catch(exception => {
                    this.errors = parseResponseErrors(exception.response)
                })
                .finally(() => this.formBusy = false)
        },
        hideErrors() {
            this.errors = []
        },
        hideSuccess() {
            this.showSuccess = false
        }
    }
}
</script>
