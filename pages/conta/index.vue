<template>
    <main>
        Bem-vindo {{ name }} <br/>
        <p><b>Email</b>: {{ email }}</p>
    </main>
</template>

<script>
export default {
    middleware: 'auth',
    computed: {
        name() {
            return this.$store.state.auth.user_name
        },
        email() {
            return this.$store.state.auth.user_email
        },
    }
}
</script>
