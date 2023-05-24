<template>
    <main class="w400">
        <h1>REGISTRAR CONTA</h1>

        <message-success v-if="showSuccess" :message="message" @hide="hideSuccess()" />

        <message-errors v-if="showErrors" :errors="errors" @hide="hideErrors()" />

        <form class="form" @submit.prevent="register()">
            <div class="form-field">
                <label for="name">Nome</label>
                <input type="text" v-model="name" name="name" id="name"/>
            </div>
            <div class="form-field">
                <label for="email">Email</label>
                <input type="text" v-model="email" name="email" id="email"/>
            </div>
            <div class="form-field">
                <label for="password">Senha</label>
                <input type="password" v-model="password" name="password" id="password"/>
            </div>
            <button type="submit">REGISTRAR</button>
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
            showErrors: false,
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
            this.showErrors = false
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
