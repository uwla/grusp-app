<template>
    <main class="w400">
        <h1>ENTRAR</h1>

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
    middleware: 'guest',
    computed: {
        errors() {
            return this.$store.state.auth.errors
        },
        showErrors() {
            return this.errors.length > 0
        },
        loggedIn() {
            return this.$store.state.auth.loggedIn
        }
    },

    data() {
        const data = {
            password: "",
            email: "",
            token: "",
            formBusy: false,
            message: "You logged in"
        }
        return data
    },

    methods: {
        /**
         * Clear the form fields
         */
        clearForm() {
            this.password = ""
            this.email = ""
        },

        /**
         * Login
         */
        login() {
            if (this.formBusy) return

            // clear messages
            this.hideErrors()

            // mark it as busy to avoid sending multiple requests if user
            // clicks the submit button several times in a row
            this.formBusy = true

            // attempt login
            const loginData = { password: this.password, email: this.email }
            const dispatch = this.$store.dispatch
            dispatch('auth/login', loginData)
                .then(() => this.formBusy = false)
        },

        /**
         * Hide the errors from the user
         */
        hideErrors() {
            this.$store.commit('auth/clearErrors')
        },
    }
}
</script>
