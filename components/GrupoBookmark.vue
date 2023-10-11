<template>
    <div class="grupo-bookmark" :class="{bookmarked}" v-if="loggedIn" @click="toggleBookmark()">
        <b-icon icon="star-fill" v-if="bookmarked" />
        <b-icon icon="star" v-else />
    </div>
</template>
<script>
export default {
    computed: {
        loggedIn() {
            return this.$auth.loggedIn
        },
        bookmarked() {
            let userBookmarks = this.$store.state.grupo.userBookmarks
            return userBookmarks.includes(this.grupoId)
        }
    },
    methods: {
        toggleBookmark() {
            if (! this.bookmarked)
                this.$store.dispatch('grupo/addBookmark', this.grupoId)
            else
                this.$store.dispatch('grupo/deleteBookmark', this.grupoId)
        }
    },
    props: {
        grupoId: Number
    }
}
</script>
<style>
.grupo-bookmark {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    line-height: 1;
    cursor: pointer;
    margin: 2px;
}

.grupo-bookmark:hover {
    background-color: rgba(255, 165, 0, 0.4);
    border-radius: .3em;
}

.bookmarked {
    color: orange
}
</style>
