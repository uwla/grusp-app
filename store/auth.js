export function state()
{
    return {
        token: "",
        user: {
            name: "",
            email: "",
        },
        loggedIn: false,
        errors: [],
    }
}

export const mutations = {
    // clear validation error messages
    clearErrors(state) {
        state.errors = []
    },

    // set the authenticated user profile data
    setUser(state, payload) {
        state.user.name = payload.name
        state.user.email = payload.email
    },

    // set the authentication token
    setToken(state, payload) {
        state.token = payload
        state.loggedIn = true
    },

    // set the validation error messages for auth forms
    setErrors(state, errors) {
        let errorMessages = []
        for (let field in errors)
            for (let error of errors[field])
                errorMessages.push(error)
        state.errors = errorMessages
    },
}

export const actions = {
    async fetchProfile({ state, commit }) {
        const axios = this.$axios
        const token = state.token
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const url = "http://localhost:8000/api/account/profile"
        axios.get(url, config)
            .then(res => {
                this.app.router.push('/conta/')
                commit('setUser', res.data)
            })
            .catch(e => console.log(e.response))
    },

    async login({ dispatch, commit }, data) {
        const axios = this.$axios
        const url = "http://localhost:8000/api/login"
        axios.post(url, data)
            .then(res => {
                commit('setToken', res.data)
                dispatch('fetchProfile')
            })
            .catch(e =>  commit('setErrors', e.response.data.errors))
    }
}
