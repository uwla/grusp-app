<template>
    <main>
        <h1>REGISTRAR CONTA</h1>

        <div class="alert success" v-if="showSuccess">
            <button class="dismiss" aria-label="Close" @click="hideSuccess()">
                <span aria-hidden="true">×</span>
            </button>
            Conta criada com sucesso!
        </div>

        <div class="alert errors" v-if="showErrors">
            <button class="dismiss" aria-label="Close" @click="hideErrors()">
                <span aria-hidden="true">×</span>
            </button>
            <ul>
                <li v-for="error,i in errors" :key="i">
                    {{ error }}
                </li>
            </ul>
        </div>

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
            errors: [],
            showErrors: false,
            showSuccess: false,
        }
        return data
    },

    methods: {

        /**
         * Register new user.
         */
        register() {
            const axios = this.$axios
            const data = {
                password: this.password,
                email: this.email,
                name: this.name,
            }
            const url = "http://localhost:8000/api/register"

            this.hideSuccess()

            axios.post(url, data)
                .then(res => {
                    console.log(res)
                    this.hideErrors()
                    this.showSuccessMsg()
                    this.clearForm()
                })
                .catch(e => {
                    // Caught an exception.
                    // The error message are in data field within the response.
                    let errors = e.response.data.errors
                    this.handleErrors(errors)
                })
        },

        /**
         * Handle request errors
         */
        handleErrors(errors) {
            this.errors = []
            for (let field in errors)
                for (let errorMessage of errors[field])
                    this.errors.push(errorMessage)
            this.showErrors = true
            console.log("showing errors", errors)
        },

        /**
         * Hide the errors from the user
         */
        hideErrors() {
            this.showErrors = false
        },

        /**
         * Hide the success message
         */
        hideSuccess() {
            this.showSuccess = false
        },

        /**
         * Show the success message
         */
        showSuccessMsg() {
            this.showSuccess = true
        },

        /**
         * Clear the form fields
         */
        clearForm() {
            this.password = ""
            this.email = ""
            this.name = ""
        }
    }
}
</script>

<style type="text/css">
#register-form, .alert {
    max-width: 500px;
    margin: 0 auto;
}

#register-form {
    display: block;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 16px
}

#register-form [type=submit] {
    display: block;
    cursor: pointer;
    border-radius: 6px;
    background-color: #28a745;
    border: none;
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

.alert {
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
}

.success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
    padding: 32px;
}

.errors {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
}

.errors ul {
    padding: 0;
    margin: 0;
    margin-left: 1em;
}

.errors button {
    background: #c21c24;
}

.errors button:hover {
    color: #f8d7da;
}

button.dismiss {
    position: absolute;
    top: 0;
    right: 0;
    color: inherit;
    border: 0;
    margin: 5px;
    font-size: 1.5em;
    border-radius: 5px;
    line-height: 1;
    -webkit-appearance: none;
    cursor: pointer;
}
</style>
