<template>
    <main class="w500">
        <h1>EDITAR PERFIL</h1>

        <p class="text-justify">Se não quiser alterar a senha, deixe a nova senha em branco</p>

        <message-success :show="showSuccess" @hide="hideSuccess()">
            {{ successMessage }}
        </message-success>

        <message-errors :errors="errors" @hide="hideErrors()"/>

        <b-form class="form" @submit.prevent="updateProfile()">
            <b-form-group label="Nome" label-for="name">
                <b-form-input type="text" v-model="name" id="name"/>
            </b-form-group>
            <b-form-group label="Email" label-for="email">
                <b-form-input type="text" v-model="email" id="email"/>
            </b-form-group>
            <b-form-group label="Senha atual" label-for="passsword_current">
                <b-form-input type="password" v-model="password_current" id="password_current"/>
            </b-form-group>
            <b-form-group label="Senha nova" label-for="passsword">
                <b-form-input type="password" v-model="password" id="password"/>
            </b-form-group>
            <b-form-group label="Confirmação da senha nova" label-for="password_confirmation">
                <b-form-input type="password" v-model="password_confirmation" id="password_confirmation"/>
            </b-form-group>
            <b-button block variant="success" type="submit">
                ATUALIZAR
            </b-button>
        </b-form>
    </main>
</template>

<script>
export default {
    middleware: 'auth',

    computed: {
        showErrors() {
            return this.errors.length > 0
        }
    },

    data() {
        return {
            email: this.$auth.user.email,
            name: this.$auth.user.name,
            password: "",
            password_confirmation: "",
            password_current: "",
            errors: [],
            formBusy: false,
            showSuccess: false,
            successMessage: "Perfil atualizado"
        }
    },

    methods: {
        updateProfile() {
            if (this.formBusy) return
            this.formBusy = true

            const data = {
                name: this.name,
                email: this.email,
                password_current: this.password_current
            }

            if (this.password !== "")
            {
                data.password = this.password
                data.password_confirmation = this.password_confirmation
            }

            const auth = this.$auth
            const axios = this.$axios
            const url = "http://localhost:8000/api/account/profile"
            const token = auth.strategy.token.get()
            const headers = { 'Authorization' : token }

            this.hideErrors()
            this.hideSuccess()

            axios.post(url, data, { headers })
                .then(response => {
                    const user = response.data
                    auth.setUser(user)
                    this.hideErrors()
                    this.showSuccessMsg()
                })
                .catch(exception => {
                    const response = exception.response
                    console.log("resposta:", response.data)
                    const errorsObj = response.data.errors
                    const errors = []
                    for (let field in errorsObj)
                        for (let errorMsg of errorsObj[field])
                            errors.push(errorMsg)
                    this.errors = errors
                })
                .finally(() => this.formBusy = false)
        },

        hideErrors() {
            this.errors = []
        },

        hideSuccess() {
            this.showSuccess = false
        },

        showSuccessMsg() {
            this.showSuccess = true
        }
    }
}
</script>
