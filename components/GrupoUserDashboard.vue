<template>
    <div>
        <b-button variant="success" href="/meus-grupos/criar">
            CRIAR GRUPO
        </b-button>
        <br />
        <br />

        <b-modal ref="modal" hide-footer size="lg">
            <grupo-view :grupo="modalGrupo" />
        </b-modal>

        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>TITULO</th>
                    <th>TAGS</th>
                    <th class="text-center w-min">AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(grupo, i) in grupos" :key="i">
                    <td>{{ grupo.titulo }}</td>
                    <td><grupo-tags :tags="grupo.tags" /></td>
                    <td class="nowrap w-min">
                        <b-button variant="success" @click="viewGrupo(grupo)">
                            <b-icon icon="eye" />
                        </b-button>
                        <b-button
                            variant="primary"
                            :href="`/meus-grupos/${grupo.id}`"
                        >
                            <b-icon icon="pencil" />
                        </b-button>
                        <b-button
                            variant="danger"
                            :href="`/meus-grupos/deletar/${grupo.id}`"
                        >
                            <b-icon icon="trash" />
                        </b-button>
                    </td>
                </tr>
                <tr class="text-center" v-if="grupos.length === 0">
                    <td colspan="3">
                        Nenhum grupo registrado; adicione e irá aparecer
                        aqui.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            modalGrupo: null, // grupo shown in modal
        }
    },
    methods: {
        viewGrupo(grupo) {
            this.modalGrupo = grupo
            this.$refs['modal'].show()
        },
    },
    props: {
        grupos: Array,
    },
}
</script>
