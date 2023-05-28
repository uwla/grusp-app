<template>
  <div>
    <div>
      <b-navbar variant="success">
        <b-navbar-nav align="end">
          <b-nav-item v-if="isGuest" href="/conta/entrar">
              Entrar
          </b-nav-item>
          <b-nav-item v-if="isGuest" href="/conta/registrar">
              Registrar
          </b-nav-item>
          <b-nav-item-dropdown v-if="isUser" text="Conta" right>
            <b-dropdown-item href="/conta/meus-grupos">Meus grupos</b-dropdown-item>
            <b-dropdown-item href="/conta/sair">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <Nuxt />
  </div>
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
