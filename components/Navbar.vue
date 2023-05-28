<template>
    <b-navbar variant="success">
        <b-navbar-nav align="end">
            <b-nav-item href="/">Home</b-nav-item>
            <b-nav-item-dropdown text="Conta" right>
                <b-dropdown-item v-if="isGuest" href="/conta/entrar">Entrar</b-dropdown-item>
                <b-dropdown-item v-if="isGuest" href="/conta/registrar">Registrar</b-dropdown-item>
                <b-dropdown-item v-if="isUser"  href="/meus-grupos">Meus grupos</b-dropdown-item>
                <b-dropdown-item v-if="isUser"  href="/conta/">Meu perfil</b-dropdown-item>
                <b-dropdown-item v-if="isUser"  href="/conta/sair">Sair</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
export default {
    computed: {
        isGuest() {
            return !this.$auth.loggedIn
        },
        isUser() {
            return this.$auth.loggedIn
        },
    }
}
</script>

<style type="text/css">
.navbar {
    font-weight: bold;
}

.navbar-nav {
    width: 100%;
}
</style>
