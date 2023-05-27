<template>
    <main>
        <h1>GRUSP</h1>

        <form>
            <b-form-group label="Pesquisar">
                <b-form-input v-model="search"/>
            </b-form-group>
            <b-form-group label="Filtrar por tags">
                <multiselect v-bind="params" v-model="selectedTags" />
            </b-form-group>
        </form>

        <p>
            Mostrando {{ filteredGrupos.length }} de {{ grupos.length }} grupos
        </p>

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
            search: "",
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
            return this.filterByTags(this.filterBySearch(this.grupos))
        }
    },
    methods: {
        tagAdd(tag) {
            if (! this.selectedTags.includes(tag))
                this.selectedTags.push(tag)
        },
        filterByTags(grupos) {
            let selected = this.selectedTags
            if (selected.length == 0) return grupos
            return grupos.filter(g => g.tags.some(t => selected.includes(t)));
        },
        filterBySearch(grupos) {
            let search = this.search.toLowerCase()
            if (search == "") return grupos
            return grupos.filter(g => {
                const t = g.titulo.toLowerCase()
                const d = g.descricao.toLowerCase()
                return t.includes(search) || d.includes(search)
            });
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
