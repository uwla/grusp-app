<template>
    <main>
        <h1>GRUSP</h1>
        <multiselect
            v-bind="params"
            v-model="selected_tags"
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
    async asyncData({ $axios }) {
        // fetch async data before sending the page to the client
        const grupos = (await $axios.get('http://localhost:8000/api/public/grupos')).data
        const tags = (await $axios.get('http://localhost:8000/api/public/tags')).data

        // options for vue-multiselect component
        const options = []
        for (let t in tags)
            options.push({ 'label': t, 'values': tags[t] })

        // parameters for vue-multiselect component
        const params = {
            'close-on-select': false,
            'group-label': 'label',
            'group-select': true,
            'group-values': 'values',
            'multiple': true,
            'options': options,
            'placeholder': 'selecionar opção',
            'show-labels': false,
        }

        // the internal component data
        const data = {
            params: params,
            selected_tags: [],
            grupos,
            tags,
        }

        return data
    },

    computed: {
        filteredGrupos() {
            let selected = this.selected_tags
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
            if (! this.selected_tags.includes(tag))
                this.selected_tags.push(tag)
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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
