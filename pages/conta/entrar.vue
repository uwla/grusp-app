<template>
    <main class="w400">
        <h1>ENTRAR</h1>

        <message-success v-if="showProfile" :message="message" />

        <message-errors v-if="showErrors" :errors="errors" @hide="hideErrors()" />

        <form class="form" @submit.prevent="login()">
            <div class="form-field">
                <label for="email">Email</label>
                <input type="text" v-model="email" name="email" id="email"/>
            </div>
            <div class="form-field">
                <label for="password">Senha</label>
                <input type="password" v-model="password" name="password" id="password"/>
            </div>
            <button type="submit">ENTRAR</button>
        </form>
    </main>
</template>

<script>
export default {
    data() {
        const data = {
            password: "",
            email: "",
            token: "",
            profile: {
                name: "",
                email: "",
            },
            errors: [],
            showErrors: false,
            showProfile: false,
            formBusy: false,
            message: ""
        }
        return data
    },

    methods: {

        fetchProfile() {
            const axios = this.$axios
            const token = this.token
            const url = "http://localhost:8000/api/account/profile"
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            axios.get(url, config)
                .then(res => {
                    const { name, email } = res.data
                    this.profile.name = name
                    this.profile.email = email
                    this.message = `Você está logado ${name} (${email}).`
                    this.showProfile = true
                })
                .catch(e => {
                    console.log(e.response)
                });
        },

        /**
         * Register new user.
         */
        login() {
            if (this.formBusy) return

            const axios = this.$axios
            const data = {
                password: this.password,
                email: this.email,
                name: this.name,
            }
            const url = "http://localhost:8000/api/login"

            // clear messages
            this.hideErrors()

            // mark it as busy to avoid sending multiple requests if user
            // clicks the submit button several times in a row
            this.formBusy = true

            axios.post(url, data)
                .then(res => {
                    this.token = res.data
                    this.fetchProfile()
                    this.hideErrors()
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
            console.log("showing errors", errors)
        },

        /**
         * Hide the errors from the user
         */
        hideErrors() {
            this.showErrors = false
        },

        /**
         * Clear the form fields
         */
        clearForm() {
            this.password = ""
            this.email = ""
        }
    }
}
</script>
