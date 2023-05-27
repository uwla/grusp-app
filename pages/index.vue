<template>
    <main>
        <h1>GRUSP</h1>
        <multiselect v-bind="params" v-model="selectedTags" />

        <div v-for="grupo,i in filteredGrupos" :key="i">
            <br/><br/>
            <b-card img-src="/vue-logo.png" img-left>
                <b-card-title>{{ grupo.titulo }}</b-card-title>
                <b-card-text>{{ grupo.descricao }}</b-card-text>
                <grupo-tags :tags="grupo.tags" @tagClicked="tagAdd"  />
            </b-card>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({ store }) {
        await store.dispatch('grupo/fetchGrupos')
        await store.dispatch('grupo/fetchTags')
        return {
            selectedTags: [],
        }
    },
    computed: {
        params() {
            return this.$store.getters['grupo/multiselectParams']
        },
        grupos() {
            return this.$store.state.grupo.grupos
        },
        filteredGrupos() {
            let selected = this.selectedTags
            let grupos = this.grupos

            // if no tag was selected, return all grupos
            if (selected.length == 0)
                return grupos

            // return the grupos such that the grupo has at least one tag that was selected
            return grupos.filter(g => g.tags.some(t => selected.includes(t)));
        }
    },
    methods: {
        tagAdd(tag) {
            if (! this.selectedTags.includes(tag))
                this.selectedTags.push(tag)
        }
    },
}
</script>

<style>
@media (max-width: 1000px) {
    .card {
        flex-wrap: wrap;
    }
    .card-img-left {
        margin: 1em auto 0 auto;
    }
}

@media (min-width: 1001px) {
    .card-img-left {
        height: 250px;
        margin: 1em;
    }
}

.card-img-left {
    border: 1px solid black;
    border-radius: 6px;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
