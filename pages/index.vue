<template>
    <main>
        <h1>GRUSP</h1>
        <multiselect
            v-bind="params"
            v-model="selectedTags"
            >
        </multiselect>

        <div class="grupo" v-for="grupo,i in filteredGrupos" :key="i">
            <h3 class="grupo-title">
                {{ grupo.titulo }}
            </h3>
            <p class="grupo-description">
                {{ grupo.descricao }}
            </p>
            <div class="grupo-tags">
                <button v-for="tag,i in grupo.tags" :key="i"
                    class="grupo-tag"
                    @click="tagAdd(tag)">
                    {{ tag }}
                </button>
            </div>
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

.grupo-tags {
    gap: 6px;
    flex-wrap: wrap;
    display: flex;
}

.grupo-tag {
    background-color: #0f0;
    border: 1px solid #000;
    border-radius: 4px;
    cursor: pointer;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
