<template>
    <main id="main">
        <h1>GRUSP</h1>

        <form>
            <b-form-group label="Pesquisar">
                <b-form-input v-model="search" />
            </b-form-group>
            <b-form-group label="Filtrar por tags">
                <multiselect
                    v-bind="mParams"
                    v-model="selectedTags"
                    @search-change="searchTagsInFilter" />
            </b-form-group>
        </form>

        <b-modal ref="modal" hide-footer size="lg">
            <grupo-view :grupo="modalGrupo" />
        </b-modal>

        <div id="grupo-filterinfo">
            Mostrando {{ filteredGrupos.length }} de {{ grupos.length }} grupos
        </div>

        <div id="grupo-perpage">
            Mostrando
            <b-select v-model="perPage" :options="[5,10,20]"></b-select>
            grupos por vez
        </div>

        <div id="grupo-bookmarkfilter" v-if="loggedIn">
            <b-form-checkbox v-model="showBookmarkedOnly">
                Mostrar apenas grupos favoritados.
            </b-form-checkbox>
        </div>

        <b-pagination v-model="currentPage" v-if="!empty"
            :total-rows="filteredGrupos.length" :per-page="perPage" align="center"/>

        <div v-for="(grupo, i) in displayedGrupos" :key="i" class="grupo-card">
            <b-card :img-src="grupo.img || defaultImg" img-left>
                <grupo-bookmark :grupoId="grupo.id" />
                <b-card-title
                    class="grupo-card-title"
                    :class="{ 'pr-4': loggedIn }">
                    <b-link @click.prevent="viewgrupo(grupo)" :href="`/grupo/${grupo.id}`">
                        {{ grupo.titulo }}
                    </b-link>
                    <b-link :href="`/grupo/${grupo.id}`">
                        <b-icon icon="box-arrow-up-right" />
                    </b-link>
                </b-card-title>
                <b-card-text>{{ grupo.descricao }}</b-card-text>
                <div class="tag-info">
                    <grupo-tags :tags="grupo.tags" @tagClicked="tagAdd" />
                    <grupo-votes :grupo="grupo" />
                </div>
            </b-card>
        </div>

        <b-pagination v-model="currentPage" v-if="!empty"
            :total-rows="filteredGrupos.length" :per-page="perPage" align="center"/>

        <div id="grupo-emptymsg" v-if="empty">
            Nenhum grupo encontrado :'(
        </div>
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

            // multiselect plugin
            mParams: params,
            mOptions: params.options,
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
        },
        tagCategory() {
            return this.$store.getters['grupo/tagCategory']
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
                const d = g.descricao.toLowerCase()
                const t = g.titulo.toLowerCase()
                return t.includes(search) || d.includes(search) || this.searchTextInTags(search, g.tags)
            })
        },
        viewGrupo(grupo) {
            this.modalGrupo = grupo
            this.$refs['modal'].show()
        },
        searchTextInTags(search, tags) {
            let categories

            categories = tags.map(t => (this.tagCategory[t] || '').toLowerCase())
            tags = tags.map(t => t.toLowerCase())

            // we search both the tag itself and its category
            return tags.some(t => t.includes(search)) ||
                   categories.some(c => c.includes(search))
        },
        // this controls which tags are visible in the Tag filter
        searchTagsInFilter(search, id) {
            if (typeof search !== 'string' || search === '')
                this.mParams.options = this.mOptions
            else {
                search = search.toLowerCase()
                let options = [... this.mOptions]
                let newOptions = []
                for (let option of options)
                {
                    let label = option.label

                    // push all options
                    if (label.toLowerCase().includes(search))
                    {
                        newOptions.push(option)
                        continue
                    }

                    // push just values which matched
                    let values = option.values.filter(v => v.toLowerCase().includes(search))
                    if (values.length > 0)
                    {
                        newOptions.push({ label, values })
                    }
                }
                this.mParams.options = newOptions
            }
        }
    },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
@media (max-width: 1000px) {
    .card {
        flex-direction: column !important;
    }
    .card-title {
        text-align: center !important;
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

#main .pagination
{
    margin-top: 3em !important;
    margin-bottom: 3em !important;
}

#grupo-bookmarkfilter,
#grupo-filterinfo,
#grupo-emptymsg,
#grupo-perpage{
    margin-top: 1em;
    margin-bottom: 1em;
}

#grupo-perpage select {
    width: auto;
}

.grupo-card {
    margin-top: 3em;
    margin-bottom: 3em;
}

.grupo-card p {
    white-space: pre-wrap;
}

.grupo-card-title {
    display: flex;
    gap: .5em;
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
