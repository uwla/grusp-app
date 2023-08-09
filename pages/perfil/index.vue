<template>
    <main class="w600">
        <h1>BEM VINDO</h1>
        <div class="profile-info">
            <b>Nome</b>: {{ name }}<br />
            <b>Email</b>: {{ email }}<br />
        </div>
        <b-button variant="primary" href="/perfil/editar">
            EDITAR PERFIL
        </b-button>
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
<style type="text/css">
.profile-info {
    margin-bottom: 2rem;
}
</style>
