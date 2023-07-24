<template>
    <span class="tag-votes">
        <span :class="{ 'bold': thisVote.vote === 1 }" @click="vote(1)">
            <b-icon icon="hand-thumbs-up" />
            {{ grupo.upvotes }}
        </span>
        <span :class="{ 'bold': thisVote.vote === 0 }" @click="vote(0)" >
            <b-icon icon="hand-thumbs-down" />
            {{ grupo.downvotes }}
        </span>
    </span>
</template>
<style>
.tag-votes .bold { font-weight: 900; color: blue }
.tag-votes span { cursor: pointer }
</style>
<script>
export default {
    computed: {
        userVotes() {
            return this.$store.state.grupo.userVotes
        },
        thisVote() {
            for (let vote of this.userVotes)
            {
                if (vote.grupo_id == this.grupo.id)
                    return vote
            }
            return { vote: null, id: null }
        },
    },
    methods: {
        vote(vote) {
            // guests cant vote
            if (! this.$auth.loggedIn) return

            const data = {
                vote: vote,
                grupo_id: this.grupo.id,
                id: this.thisVote.id,
            }

            if (data.id === null)
                this.$store.dispatch('grupo/addVote',data)
            else if (vote !== this.thisVote.vote)
                this.$store.dispatch('grupo/updateVote', data)
            else
                this.$store.dispatch('grupo/deleteVote', data)
        }
    },
    props: {
        grupo: Object
    }
}
</script>
