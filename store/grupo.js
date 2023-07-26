export function state() {
    return {
        tags: [],
        grupos: [],
        userVotes: [], // votes made by the authenticated user
        userComments: [] // comments made by the authenticated user
    }
}

export const getters = {
    /* MULTISELECT PLUGIN */

    // options used by multiselect plugin
    multiselectOptions(state) {
        const tags = state.tags
        const options = []
        for (let t in tags) options.push({ label: t, values: tags[t] })
        return options
    },

    // parameters for multiselect plugin
    multiselectParams(state, getters) {
        // the options is accessed via another getter
        const options = getters.multiselectOptions

        // these are the global parameters
        return {
            'close-on-select': false,
            'group-label': 'label',
            'group-select': true,
            'group-values': 'values',
            multiple: true,
            options: options,
            placeholder: 'selecionar tag',
            'show-labels': false,
        }
    },
}

export const mutations = {
    setTags(state, tags) {
        state.tags = tags
    },
    setGrupos(state, grupos) {
        state.grupos = grupos
    },
    setVotes(state, votes) {
        state.userVotes = votes
    },
    setComments(state, comments) {
        state.userComments = comments
    },
    addVote(state, vote) {
        state.userVotes.push(vote)

        // find grupo to be updated
        const ind = state.grupos.findIndex(g => g.id == vote.grupo_id)
        if (ind < 0) return

        // copy the old value
        let grupo = { ... state.grupos[ind] }

        // update grupo's vote
        if (vote.vote) grupo.upvotes += 1
        else grupo.downvotes += 1

        // update the array
        state.grupos.splice(ind, 1, grupo)
    },
    updateVote(state, vote) {
        let ind = state.userVotes.findIndex(v => v.id == vote.id)
        if (ind < 0 ) return

        // the old vote
        const oldVote = {... state.userVotes[ind] }

        // if votes are equal, nothing changed...
        if (oldVote.vote === vote.vote) return

        // update vote array
        state.userVotes.splice(ind, 1, vote)

        // find grupo to be updated
        ind = state.grupos.findIndex(g => g.id == vote.grupo_id)
        if (ind < 0) return

        // copy the old value
        let grupo = { ... state.grupos[ind] }

        // update grupo's vote
        if (vote.vote) grupo.upvotes += 1
        else grupo.downvotes += 1
        if (oldVote.vote) grupo.upvotes -= 1
        else grupo.downvotes -= 1

        // update the array
        state.grupos.splice(ind, 1, grupo)
    },
    deleteVote(state, vote) {
        state.userVotes = state.userVotes.filter(v => v.id != vote.id)

        // find grupo to be updated
        const ind = state.grupos.findIndex(g => g.id == vote.grupo_id)
        if (ind < 0) return

        // copy the old value
        let grupo = { ... state.grupos[ind] }

        // update grupo's vote
        if (vote.vote) grupo.upvotes -= 1
        else grupo.downvotes -= 1

        // update the array
        state.grupos.splice(ind, 1, grupo)
    },
    addComment(state, comment) {
        const { grupo_id } = comment
        let ind = state.grupos.findIndex(g => g.id === grupo_id)
        let grupo = { ... state.grupos[ind] }
        grupo.comments.push(comment)
        state.grupos.splice(ind, 1, grupo)
        state.userComments.push(comment)
    },
    delComment(state, comment) {
        const { grupo_id } = comment
        let ind = state.grupos.findIndex(g => g.id === grupo_id)
        let grupo = { ... state.grupos[ind] }
        let c_ind = grupo.comments.findIndex(c => c.id == comment.id)
        grupo.comments.splice(c_ind, 1)
        state.grupos.splice(ind, 1, grupo)
    }
}

export const actions = {
    async fetchTags({ commit }) {
        const url = '/public/tags'
        const tags = (await this.$axios.get(url)).data
        commit('setTags', tags)
    },
    async fetchGrupos({ commit }) {
        const url = '/public/grupos'
        const grupos = (await this.$axios.get(url)).data
        commit('setGrupos', grupos)
    },
    async fetchUserVotes({ commit }) {
        if (this.$auth.loggedIn) {
            const data = (await this.$axios.get('/account/votes')).data
            commit('setVotes', data)
        }
    },
    async fetchUserComments({ commit }) {
        if (this.$auth.loggedIn) {
            const data = (await this.$axios.get('/account/comments')).data
            commit('setComments', data)
        }
    },
    async addVote({ commit }, payload) {
        let data = { ...payload }
        data = (await this.$axios.post('/vote', data)).data
        commit('addVote', data)
    },
    async updateVote({ commit }, payload) {
        let data = { ...payload }
        let { id } = data
        data._method = 'PUT'
        data = (await this.$axios.post(`/vote/${id}`, data)).data
        commit('updateVote', data)
    },
    async deleteVote({ commit }, payload) {
        let data = { ...payload }
        let { id } = data
        await this.$axios.delete(`/vote/${id}`, { data })
        commit('deleteVote', data)
    },
    async addComment({ commit }, payload) {
        let data = { ...payload }
        data = (await this.$axios.post('/comment', data)).data
        commit('addComment', data)
    },
    async deleteComment({ commit }, payload) {
        let data = { ...payload }
        let { id } = data
        data = (await this.$axios.delete(`/comment/${id}`, data)).data
        commit('delComment', data)
    },
}
