<template>
    <main id="main" :class="{ 'nojs': !jsLoaded }">
        <h1>GRUSP</h1>

        <form @submit.prevent="" id="gform">
            <b-input form="gform" name="pagina" v-model="currentPage" hidden />

            <b-form-group label-for="pesquisa" label="Pesquisar">
                <b-input-group>
                    <b-form-input id="pesquisa" name="pesquisa"
                        :value="search" @input="updateSearch" />
                    <template #append>
                        <b-button class="nojs" type="submit" variant="primary">PESQUISAR</b-button>
                    </template>
                </b-input-group>
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
            <div class="d-inline">
                <b-select form="gform" name="perPage" :options="perPageValues"
                    :value="perPage" @input="updatePerPage" />
                <b-button class="nojs" form="gform" type="submit" variant="primary">OK</b-button>
            </div>
            grupos por vez
        </div>

        <div id="grupo-bookmarkfilter" v-if="loggedIn">
            <b-form-checkbox v-model="showBookmarkedOnly">
                Mostrar apenas grupos favoritados.
            </b-form-checkbox>
        </div>

        <b-pagination-nav v-model="currentPage" v-if="!empty"
            :link-gen="linkGen" :number-of-pages="nPages" use-router align="center" />

        <div v-for="(grupo, i) in displayedGrupos" :key="i" class="grupo-card">
            <b-card :img-src="grupo.img || defaultImg" img-left>
                <grupo-bookmark :grupoId="grupo.id" />
                <b-card-title class="grupo-card-title" :class="{'pr-4': loggedIn}">
                    <b-link @click.prevent="viewGrupo(grupo)" :href="`/grupo/${grupo.id}`">
                        {{ grupo.titulo }}
                    </b-link>
                    <b-link :href="`/grupo/${grupo.id}`">
                        <small><b-icon icon="box-arrow-up-right" /></small>
                    </b-link>
                </b-card-title>
                <b-card-text>{{ grupo.descricao }}</b-card-text>
                <div class="tag-info">
                    <grupo-tags :tags="grupo.tags" @tagClicked="tagAdd" />
                    <grupo-votes :grupo="grupo" />
                </div>
            </b-card>
        </div>

        <b-pagination-nav v-model="currentPage" v-if="!empty"
            :link-gen="linkGen" :number-of-pages="nPages" use-router align="center" />

        <div id="grupo-emptymsg" v-if="empty">
            Nenhum grupo encontrado :'(
        </div>
    </main>
</template>
<script>
import { defineHead } from '../utils'

export default {
    head: defineHead('GRUSP', 'Catálogo de grupos da USP'),
    async asyncData({ store, query }) {
        await store.dispatch('grupo/fetchGrupos')
        await store.dispatch('grupo/fetchTags')
        await store.dispatch('grupo/fetchUserVotes')
        await store.dispatch('grupo/fetchUserComments')
        await store.dispatch('grupo/fetchUserBookmarks')

        const multiselectParams = store.getters['grupo/multiselectParams']
        const grupos = store.state.grupo.grupos
        const perPageValues = [5, 10, 20]
        let perPage = query.perPage
        let currentPage = query.pagina
        let search = query.pesquisa || ''

        // validate current page
        if (!Number(currentPage))
            currentPage = 1
        else
            currentPage = Number(currentPage)
        if (currentPage > Math.ceil(grupos.length/perPage))
            currentPage = 1

        // validate per page
        if (!Number(perPage))
            perPage = 1
        else
            perPage = Number(perPage)
        if (!perPageValues.includes(perPage))
            perPage = perPageValues[0]

        return {
            selectedTags: [],
            search: search,
            modalGrupo: null,
            currentPage: currentPage,
            perPage: perPage,
            perPageValues: perPageValues,
            defaultImg: '/vue-logo.png',
            showBookmarkedOnly: false,

            // multiselect plugin
            mParams: multiselectParams,
            mOptions: multiselectParams.options,

            //
            jsLoaded: false,
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
        nPages() {
            return Math.ceil(this.filteredGrupos.length / this.perPage)
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
        linkGen(pageNum) {
            let link = '?'

            // query params
            let params = []
            if (pageNum !== 1)
                params.push(`pagina=${pageNum}`)
            if (this.perPage !== this.perPageValues[0])
                params.push(`perPage=${this.perPage}`)
            if (this.search !== '')
                params.push(`pesquisa=${this.search}`)

            link += params.join('&')
            return link
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
        },
        // update search text and url
        updateSearch(val) {
            this.search = val
            this.currentPage = 1
            this.updateUrl()
        },
        // update per page and url
        updatePerPage(val) {
            // compute new page for pagination
            this.perPage = val
            this.currentPage =1
            this.updateUrl()
        },
        // force update url
        updateUrl() {
            history.pushState(
                {},
                null,
                this.$route.path + this.linkGen(this.currentPage)
            )
        }
    },
    mounted() {
        this.jsLoaded = true
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
