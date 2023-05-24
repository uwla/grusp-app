<template>
    <main class="w400">
        <h1>Bem vindo</h1>
        <b>Nome</b>: {{ name }} <br/>
        <b>Email</b>: {{ email }} <br/>
        <br/>
        <router-link to="/conta/sair">LOGOUT</router-link>
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
}
</script>
