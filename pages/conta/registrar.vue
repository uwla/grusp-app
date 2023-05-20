<template>
    <main class="w500">
        <h1>REGISTRAR CONTA</h1>

        <message-success v-show="showSuccess" :message="message" @hide="hideSuccess()" />

        <message-errors v-show="showErrors" :errors="errors" @hide="hideErrors()" />

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
            message: "Conta criada com sucesso!"
        }
        return data
    },

    methods: {

        /**
         * Register new user.
         */
        register() {
            const axios = this.$axios
            const data = {
                password: this.password,
                email: this.email,
                name: this.name,
            }
            const url = "http://localhost:8000/api/register"

            this.hideSuccess()

            axios.post(url, data)
                .then(res => {
                    console.log(res)
                    this.hideErrors()
                    this.showSuccessMsg()
                    this.clearForm()
                })
                .catch(e => {
                    // Caught an exception.
                    // The error message are in data field within the response.
                    let errors = e.response.data.errors
                    this.handleErrors(errors)
                })
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
            console.log("showing errors", errors)
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
