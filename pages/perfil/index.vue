<template>
    <main >
        <h1>BEM VINDO</h1>
        <section class="profile">
            <h2>PERFIL</h2>
            <div class="profile-info">
                <b>Nome</b>: {{ name }}<br />
                <b>Email</b>: {{ email }}<br />
            </div>
            <b-button variant="primary" href="/perfil/editar">
                EDITAR PERFIL
            </b-button>
        </section>
        <section class="groups">
            <h2>GRUPOS</h2>
            <grupo-user-dashboard v-bind="{ grupos }" />
        </section>
    </main>
</template>

<script>
export default {
    middleware: 'auth',
    async asyncData({ $axios }) {
        const url = '/account/grupos'
        const grupos = (await $axios.get(url)).data
        return {
            grupos: grupos,
        }
    },
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
.profile .profile-info {
    margin-bottom: .5rem;
}

section.profile {
    margin-bottom: 2em;
}

section h2 {
    margin-bottom: 1em;
}
</style>
