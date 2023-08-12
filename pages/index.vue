<template>
    <main id="main">
        <h1>GRUSP</h1>

        <form>
            <b-form-group label="Pesquisar">
                <b-form-input v-model="search" />
            </b-form-group>
            <b-form-group label="Filtrar por tags">
                <multiselect
                    v-bind="params"
                    v-model="selectedTags"
                    @search-change="searchTags" />
            </b-form-group>
        </form>

        <b-modal ref="modal" hide-footer hide-header size="lg">
            <grupo-view :grupo="modalGrupo" />
        </b-modal>

        <p>Mostrando {{ filteredGrupos.length }} de {{ grupos.length }} grupos</p>

        <div v-if="loggedIn">
            <b-form-checkbox v-model="showBookmarkedOnly">
                Mostrar apenas grupos favoritados.
            </b-form-checkbox>
        </div>

        <b-pagination v-model="currentPage" v-if="!empty"
            :total-rows="filteredGrupos.length" :per-page="perPage" align="center"/>

        <div v-for="(grupo, i) in displayedGrupos" :key="i" class="grupo-card">
            <b-card :img-src="grupo.img || defaultImg" img-left>
                <grupo-bookmark :grupoId="grupo.id" />
                <b-link @click.prevent="viewGrupo(grupo)" :href="`/grupo/${grupo.id}`">
                    <b-card-title>{{ grupo.titulo }}</b-card-title>
                </b-link>
                <b-card-text>{{ grupo.descricao }}</b-card-text>
                <div class="tag-info">
                    <grupo-tags :tags="grupo.tags" @tagClicked="tagAdd" />
                    <grupo-votes :grupo="grupo" />
                </div>
            </b-card>
        </div>

        <b-pagination v-model="currentPage" v-if="!empty"
            :total-rows="filteredGrupos.length" :per-page="perPage" align="center"/>

        <p class="mt-3 mb-3" v-if="empty">
            Nenhum grupo encontrado :'(
        </p>
    </main>
</template>
<script>
export default {
    async asyncData({ store }) {
        await store.dispatch('grupo/fetchGrupos')
        await store.dispatch('grupo/fetchTags')
        await store.dispatch('grupo/fetchUserVotes')
        await store.dispatch('grupo/fetchUserComments')
        await store.dispatch('grupo/fetchUserBookmarks')

        const params = store.getters['grupo/multiselectParams']

        return {
            selectedTags: [],
            search: '',
            modalGrupo: null,
            currentPage: 1,
            perPage: 5,
            defaultImg: '/vue-logo.png',
            showBookmarkedOnly: false,
            params: params,
            tagOptions: params.options,
        }
    },
    computed: {
        bookmarks() {
            return this.$store.state.grupo.userBookmarks
        },
        grupos() {
            return this.$store.state.grupo.grupos
        },
        filteredGrupos() {
            return this.filterByTags(this.filterBySearch(this.filterByBookmarks(this.grupos)))
        },
        empty() {
            return this.filteredGrupos.length === 0
        },
        displayedGrupos() {
            const first = (this.currentPage - 1) * this.perPage
            const last = first + this.perPage
            return this.filteredGrupos.slice(first, last)
        },
        loggedIn() {
            return this.$auth.loggedIn
        }
    },
    methods: {
        tagAdd(tag) {
            if (!this.selectedTags.includes(tag)) this.selectedTags.push(tag)
        },
        filterByBookmarks(grupos) {
            if (!this.showBookmarkedOnly)
                return grupos
            return grupos.filter(g => this.bookmarks.includes(g.id))
        },
        filterByTags(grupos) {
            let selected = this.selectedTags
            if (selected.length == 0) return grupos
            return grupos.filter(g => selected.every(t => g.tags.includes(t)))
        },
        filterBySearch(grupos) {
            let search = this.search.toLowerCase()
            if (search == '') return grupos
            return grupos.filter(g => {
                const t = g.titulo.toLowerCase()
                const d = g.descricao.toLowerCase()
                return t.includes(search) || d.includes(search)
            })
        },
        viewGrupo(grupo) {
            this.modalGrupo = grupo
            this.$refs['modal'].show()
        },
        searchTags(search, id) {
            if (typeof search !== 'string' || search === '')
                this.params.options = this.tagOptions
            else {
                search = search.toLowerCase()
                let options = [... this.tagOptions]
                let newOptions = []
                for (let option of options)
                {
                    let label = option.label

                    // push all options
                    if (label.includes(search))
                    {
                        newOptions.push(option)
                        continue
                    }

                    // push just values which matched
                    let values = option.values.filter(v => v.includes(search))
                    if (values.length > 0)
                    {
                        newOptions.push({ label, values })
                    }
                }
                this.params.options = newOptions
            }
        }
    },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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
        height: 280px;
        width: 280px;
        margin: 1em;
    }
}

#main .pagination {
    margin-top: 3em !important;
    margin-bottom: 3em !important;
}

.grupo-card {
    margin-top: 3em;
    margin-bottom: 3em;
}

.card-img-left {
    border: 1px solid black;
    border-radius: 6px;
}

.tag-info {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
</style>
