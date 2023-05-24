<template>
    <main class="w400">
        <h1>Bem vindo</h1>
        <b>Nome</b>: {{ name }} <br/>
        <b>Email</b>: {{ email }} <br/>
        <br/>
        <button @click="logout()">LOGOUT</button>
    </main>
</template>

<script>
export default {
    middleware: 'auth',
    computed: {
        name() {
            return this.$auth.user.name
        },
        email() {
            return this.$auth.user.email
        },
    },
    methods: {
        logout() {
            this.$auth.logout()
        }
    },
}
</script>
