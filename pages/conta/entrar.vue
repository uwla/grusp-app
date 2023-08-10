<template>
    <main class="w400">
        <h1>ENTRAR</h1>

        <message-errors :errors="errors" @hide="hideErrors()" />

        <div class="text-right small">
            <b-link href="/conta/esqueci-senha">
                Esqueceu sua senha?
            </b-link>
        </div>

        <b-form class="form" @submit.prevent="login()">
            <b-form-group label="Email" label-for="email">
                <b-form-input type="text" v-model="email" id="email" />
            </b-form-group>
            <b-form-group label="Senha" label-for="password">
                <b-form-input type="password" v-model="password" id="password" />
            </b-form-group>
            <b-button block variant="success" type="submit">ENTRAR</b-button>
        </b-form>

        <br>
        <b-alert class="small" variant="info" :show="showVerifyMessage">
            Se sua conta não foi verificada, solicite um link de verificação de
            conta <b-link href="/conta/link-verificacao">clicando aqui</b-link>
        </b-alert>
    </main>
</template>
<script>
import { parseResponseErrors } from '../../utils'

export default {
    middleware: 'auth',
    auth: 'guest',

    computed: {
        showErrors() {
            return this.errors.length > 0
        },
        showVerifyMessage() {
            for (let error of this.errors) {
                if (error.includes('verificar')
                    || error.includes('verificada')
                    || error.includes('verificado'))
                    return true
            }
            return false
        }
    },

    data() {
        return {
            password: '',
            email: '',
            formBusy: false,
            errors: [],
        }
    },

    methods: {
        login() {
            if (this.formBusy) return
            this.formBusy = true
            this.errors = []
            const { password, email } = this
            const auth = this.$auth

            auth.loginWith('local', {
                data: { password, email },
            }).then(response => {
                auth.setUser(response.data.user)
            }).catch(exception => {
                this.errors = parseResponseErrors(exception.response)
            }).finally(() => {
                this.formBusy = false
            })
        },

        hideErrors() {
            this.errors = []
        },
    },
}
</script>
