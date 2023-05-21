<template>
    <main class="w400">
        <h1>Bem vindo</h1>
        <b>Nome</b>: {{ name }} <br/>
        <b>Email</b>: {{ email }} <br/>
    </main>
</template>

<script>
export default {
    middleware: 'auth',
    computed: {
        name() {
            return this.$store.state.auth.user.name
        },
        email() {
            return this.$store.state.auth.user.email
        },
    }
}
</script>
