<template>
    <main class="w400">
        <big>
            Your email is verified? {{ verified }}
        </big>
    </main>
</template>
<script>
export default {
    async asyncData({ route, $axios }) {
        // get the parameters for the request
        const { id, hash, signature, expires } = route.query

        // build the verification request URL
        const url = `/account/verify/${id}/${hash}?expires=${expires}&signature=${signature}`

        // verification status
        let status

        // send a verification request
        await $axios.get(url)
            .then(response => status = response.data.status || 'error')
            .catch(() => status = 'error')

        // store the status
        return { status }
    },

    computed: {
        verified() {
            return this.status === 'verified'
        }
    },
}
</script>
