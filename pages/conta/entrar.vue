<template>
    <main class="w400">
        <h1>ENTRAR</h1>

        <message-errors v-if="showErrors" :errors="errors" @hide="hideErrors()"/>

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
    middleware: 'auth',
    auth : 'guest',

    computed: {
        showErrors() {
            return this.errors.length > 0
        }
    },

    data() {
        return {
            password: "",
            email: "",
            formBusy: false,
            errors: [],
        }
    },

    methods: {
        clearForm() {
            this.password = ""
            this.email = ""
        },

        login() {
            if (this.formBusy) return
            this.formBusy = true
            const { password, email } = this
            const auth = this.$auth
            auth.loginWith('laravelSanctum', {
                    data: { password, email }
                })
                .then(response => {
                    const { token, user } = response.data
                    auth.strategy.token.set(`Bearer ${token}`)
                    auth.setUser(user)
                })
                .catch(exception => {
                    const response = exception.response
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
        }
    },
}
</script>
