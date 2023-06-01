<template>
    <main class="w500">
        <h1>Bem vindo</h1>
        <b>Nome</b>: {{ name }} <br/>
        <b>Email</b>: {{ email }} <br/>
        <br/>
        <b-button variant="primary" href="/perfil/editar">EDITAR PERFIL</b-button>
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
