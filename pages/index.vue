<template>
    <main>
        <h1>GRUSP</h1>
        <multiselect v-bind="params" v-model="selectedTags" />

        <div v-for="grupo,i in filteredGrupos" :key="i">
            <br/><br/>
            <b-card img-src="/vue-logo.png" img-alt="Grupo logo" img-left :title="grupo.titulo" >
                <p>{{ grupo.descricao }}</p>
                <div class="tag-container">
                    <b-button variant="success" size="sm"
                        v-for="tag,i in grupo.tags" :key="i"
                        @click="tagAdd(tag)">
                        {{ tag }}
                    </b-button>
                </div>
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
.grupo {
    border: 1px solid #ccc;
    border-radius: 6px;
    margin: 20px 0;
    padding: 16px;
    display: flex;
    gap: 10px;
    flex-direction: column;
}

.grupo-title {
    text-transform: uppercase;
    margin: 0;
}

.grupo-description {
    text-align: justify;
    margin: 0;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
