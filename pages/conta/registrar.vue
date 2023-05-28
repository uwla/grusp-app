<template>
    <main class="w400">
        <h1>REGISTRAR CONTA</h1>

        <message-success :show="showSuccess" @hide="hideSuccess()">
            {{ message }}
        </message-success>

        <message-errors :errors="errors" @hide="hideErrors()" />

        <form class="form" @submit.prevent="register()">
            <b-form-group label="Nome" label-for="name">
                <b-form-input type="text" v-model="name" id="name"/>
            </b-form-group>
            <b-form-group label="Email" label-for="email">
                <b-form-input type="text" v-model="email" id="email"/>
            </b-form-group>
            <b-form-group label="Senha" label-for="passsword">
                <b-form-input type="password" v-model="password" id="password"/>
            </b-form-group>
            <b-button block variant="success" type="submit">
                REGISTRAR
            </b-button>
        </form>
    </main>
</template>

<script>
export default {
    data() {
        const data = {
            password: "",
            email: "",
            name: "",
            errors: [],
            showSuccess: false,
            message: "Conta criada com sucesso!",
            formBusy: false,
        }
        return data
    },

    methods: {

        /**
         * Register new user.
         */
        register() {
            if (this.formBusy) return

            const axios = this.$axios
            const data = {
                password: this.password,
                email: this.email,
                name: this.name,
            }
            const url = "http://localhost:8000/api/auth/register"

            // clear messages
            this.hideErrors()
            this.hideSuccess()

            // mark it as busy to avoid sending multiple requests if user
            // clicks the submit button several times in a row
            this.formBusy = true

            axios.post(url, data)
                .then(() => {
                    this.hideErrors()
                    this.showSuccessMsg()
                    this.clearForm()
                })
                .catch(e => {
                    // Caught an exception.
                    // The error message are in data field within the response.
                    let errors = e.response.data.errors
                    this.handleErrors(errors)
                }).then(() => {
                    // regardless of what happened, mark it as not busy
                    this.formBusy = false
                });
        },

        /**
         * Handle request errors
         */
        handleErrors(errors) {
            this.errors = []
            for (let field in errors)
                for (let errorMessage of errors[field])
                    this.errors.push(errorMessage)
            this.showErrors = true
        },

        /**
         * Hide the errors from the user
         */
        hideErrors() {
            this.errors = []
        },

        /**
         * Hide the success message
         */
        hideSuccess() {
            this.showSuccess = false
        },

        /**
         * Show the success message
         */
        showSuccessMsg() {
            this.showSuccess = true
        },

        /**
         * Clear the form fields
         */
        clearForm() {
            this.password = ""
            this.email = ""
            this.name = ""
        }
    }
}
</script>
