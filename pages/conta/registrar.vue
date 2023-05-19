<template>
    <main>
        <h1>REGISTRAR CONTA</h1>
        <form id="register-form" @submit.prevent="register()">
            <div class="form-field">
                <label for="name">Nome</label>
                <input type="text" v-model="name" name="name" id="name"/>
            </div>
            <div class="form-field">
                <label for="email">Email</label>
                <input type="text" v-model="email" name="email" id="email"/>
            </div>
            <div class="form-field">
                <label for="password">Senha</label>
                <input type="password" v-model="password" name="password" id="password"/>
            </div>
            <button type="submit">REGISTRAR</button>
        </form>
    </main>
</template>

<script>
export default {
    data() {
        const data = {
            password: "",
            email: "",
            name: "",
            token: "",
        }
        return data
    },

    async mounted() {
        const axios = this.$axios
        const url = "http://localhost:8000/sanctum/csrf-cookie"
        axios.get(url).then(res => console.log(res))
    },

    methods: {
        async register() {
            const config = {
                headers:{
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "multipart/form-data"
                }
            };
            const axios = this.$axios
            const url = "http://localhost:8000/api/register"
            const data = {
                password: this.password,
                email: this.email,
                name: this.name,
            }
            await axios.post(url, data, config)
                .catch(err => console.log(err))
                .then(res => console.log(res))
        }
    }
}
</script>

<style type="text/css">
#register-form {
    max-width: 500px;
    display: block;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 16px
}

#register-form [type=submit] {
    display: block;
    border-radius: 6px;
    background-color: #28a745;
    border-color: #28a745;
    color: #fff;
    width: 100%;
    padding: 8px;
}

.form-field {
    margin-bottom: 1em;
}

.form-field label {
    display: inline-block;
    margin-bottom: 0.5rem
}

.form-field input {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.form-field input:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}
</style>
