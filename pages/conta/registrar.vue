<template>
    <main class="w500">
        <h1>REGISTRAR CONTA</h1>

        <message-success :show="showSuccess" @hide="hideSuccess()">
            Conta criada! Um link de confirmação de conta foi enviado para seu email.
        </message-success>

        <message-errors :errors="errors" @hide="hideErrors()" />

        <form class="form" @submit.prevent="register()">
            <b-form-group label="Nome" label-for="name">
                <b-form-input type="text" v-model="f.name" id="name" min="3" required />
            </b-form-group>
            <b-form-group label="Email" label-for="email">
                <b-form-input type="email" v-model="f.email" id="email" required />
            </b-form-group>
            <b-form-group label="Senha" label-for="password">
                <b-form-input type="password" v-model="f.password" id="password" min="8" required />
            </b-form-group>
            <b-form-group label="Confirmação da senha" label-for="password_confirmation">
                <b-form-input v-model="f.password_confirmation" type="password" id="password_confirmation" min="8" required />
            </b-form-group>
            <b-button block variant="success" type="submit">
                REGISTRAR
            </b-button>
        </form>
    </main>
</template>
<script>
import { parseResponseErrors, defineHead } from '../../utils'

export default {
    head: defineHead('GRUSP - Registrar',
        'Registrar conta no GRUSP - Grupos USP',
        'noindex, nofollow'),
    data() {
        const data = {
            f: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            errors: [],
            showSuccess: false,
            formBusy: false,
        }
        return data
    },

    methods: {
        register() {
            if (this.formBusy) return
            this.formBusy = true

            this.hideErrors()
            this.hideSuccess()

            const axios = this.$axios
            const url = '/auth/register'
            const data = this.f

            axios
                .post(url, data)
                .then(() => {
                    this.hideErrors()
                    this.showSuccessMsg()
                    this.clearForm()
                })
                .catch(e => {
                    this.errors = parseResponseErrors(e.response)
                })
                .then(() => {
                    this.formBusy = false
                })
        },

        hideErrors() {
            this.errors = []
        },

        hideSuccess() {
            this.showSuccess = false
        },

        showSuccessMsg() {
            this.showSuccess = true
        },

        clearForm() {
            for (let field in this.f) this.f[field] = ''
        },
    },
}
</script>
