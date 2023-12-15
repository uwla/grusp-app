<template>
    <main class="w600">
        <h1>BEM VINDO</h1>
        <div id="profile-info">
            <b>Nome</b>: {{ name }}<br />
            <b>Email</b>: {{ email }}<br />
        </div>
        <div id="profile-buttons">
            <b-button variant="primary" href="/perfil/editar">
                EDITAR PERFIL
            </b-button>
            <b-button variant="info" href="/meus-grupos/">
                MEUS GRUPOS
            </b-button>
            <b-button variant="success" href="/meus-grupos/criar">
                CRIAR GRUPO
            </b-button>
        </div>
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
#profile-info {
    margin-bottom: 2rem;
}
#profile-buttons {
    display: flex;
    gap: 5px;
}
</style>
