<template>
    <div>
        <message-errors :errors="errors" @hide="hideErrors()" />

        <message-success :show="showSuccess" @hide="hideSuccess()">
            {{ successMessage }}
        </message-success>

        <form class="form" @submit.prevent="nothing()">
            <b-form-group label="Título" label-for="titulo">
                <b-form-input type="text" v-model="titulo" id="titulo" min="2" required />
            </b-form-group>

            <b-form-group label="Descrição" label-for="descricao">
                <b-form-textarea v-model="descricao" id="descricao" rows="8" min="10" required />
            </b-form-group>

            <b-form-group label="Imagem Principal">
                <div v-if="imgURI">
                    <img :src="imgURI" alt="" />
                    <p class="text-center">
                        A imagem acima será a imagem do grupo
                    </p>
                </div>
                <vue-anka-cropper :options="cropperOptions" @cropper-saved="updateImg" />
            </b-form-group>

            <b-form-group label="Fotos do grupo (adicionar fotos)" label-for="images">
                <b-form-file v-model="images"  id="images" accept=".jpg,.png" multiple />
            </b-form-group>

            <b-form-group v-if="imagesCurrent.length > 0"
                label="Fotos atuais do grupo (selecione para remover)">
                <b-form-checkbox-group v-model="imagesToDel">
                    <b-form-checkbox v-for="img,i in imagesCurrent" :key="i" :value="img.id">
                        <img class="img-check" :src="img.url">
                    </b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>

            <b-form-group label="Informações de contato" label-for="contato">
                <b-form-textarea v-model="contato" id="contato" rows="3" min="5" />
            </b-form-group>

            <b-form-group label="Informações de horários de encontro" label-for="horario">
                <b-form-textarea v-model="horario" id="horario" rows="3" min="5" />
            </b-form-group>

            <b-form-group label="Informações do lugar de encontro" label-for="lugar">
                <b-form-textarea v-model="lugar" id="lugar" rows="3" min="5" />
            </b-form-group>

            <b-form-group label="Informações sobre mensalidade" label-for="mensalidade" >
                <b-form-textarea v-model="mensalidade" id="mensalidade" rows="3" min="5" />
            </b-form-group>

            <b-form-group label="Informações sobre público alvo" label-for="publico">
                <b-form-textarea v-model="publico" id="publico" rows="3" min="5" />
            </b-form-group>

            <b-form-group label="Links úteis (redes sociais, grupos de mensagem, site)" label-for="links">
                <b-form-textarea v-model="links" id="links" rows="3" min="5" />
            </b-form-group>

            <b-form-group label="Categoria do grupo">
                <multiselect
                    v-bind="mParams"
                    v-model="tags"
                    @search-change="searchTagsInFilter" />
            </b-form-group>

            <div class="form-buttons">
                <b-button block variant="success" @click="submitForm()">
                    ENVIAR
                </b-button>
                <b-button block variant="danger" @click="initializeValues()">
                    RESETAR
                </b-button>
            </div>
        </form>
    </div>
</template>
<script>
import { parseResponseErrors } from '../utils'

export default {
    data() {
        const params = this.$store.getters['grupo/multiselectParams']

        return {
            titulo: '',
            descricao: '',
            contato: '',
            mensalidade: '',
            horario: '',
            lugar: '',
            publico: '',
            links: '',
            img: null,
            imgURI: null,
            images: [],
            imagesCurrent: [],
            imagesToDel: [],
            tags: [],
            errors: [],
            showSuccess: false,
            cropperOptions: {
                showPreview: false,
                dropareaMessage: 'Descarregue a imagem aqui',
                selectButtonLabel: 'Selecionar imagem',
            },

            // multiselect plugin
            mParams: params,
            mOptions: params.options,
        }
    },

    computed: {
        showErrors() {
            return this.errors.length > 0
        },
    },

    mounted() {
        this.initializeValues()
    },

    methods: {
        updateImg(payload) {
            this.img = payload.croppedFile
            this.imgURI = payload.croppedImageURI
        },

        initializeValues() {
            // initialize the values
            this.titulo = this.grupo.titulo ?? ''
            this.descricao = this.grupo.descricao ?? ''
            this.contato = this.grupo.contato ?? ''
            this.horario = this.grupo.horario ?? ''
            this.links = this.grupo.links ?? ''
            this.lugar = this.grupo.lugar ?? ''
            this.mensalidade = this.grupo.mensalidade ?? ''
            this.publico = this.grupo.publico ?? ''
            this.tags = this.grupo.tags ?? []
            this.imgURI = this.grupo.img ?? ''
            this.imagesCurrent = this.grupo.images ?? []
        },

        // don't do nothing
        // this is due to VueAnkaCropper plugin which is accidentally submitting
        // the form even if the user does not click the SUBMIT button
        nothing() {},

        // actually submit the form
        submitForm() {
            const { contato, descricao, horario, images, imagesToDel, img, links,
                lugar, mensalidade, method, publico, tags, titulo, url, } = this
            const formData = new FormData()

            // append string fields
            formData.append('titulo', titulo)
            formData.append('descricao', descricao)
            formData.append('contato', contato)
            formData.append('horario', horario)
            formData.append('links', links)
            formData.append('lugar', lugar)
            formData.append('mensalidade', mensalidade)
            formData.append('publico', publico)
            formData.append('_method', method)

            // append main image
            if (img != null) formData.append('img', img)

            // append images to be added
            images.forEach(im => formData.append('images[]', im))

            // append images to be deleted
            imagesToDel.forEach(im => formData.append('images_del[]', im))

            // append tag array
            tags.forEach(t => formData.append('tags[]', t))

            // request headers
            const headers = { 'Content-Type': 'multipart/form-data' }

            this.$axios.post(url, formData, { headers })
                .then(res => {
                    this.hideErrors()
                    this.showSuccess = true
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                })
                .catch(e => {
                    this.errors = parseResponseErrors(e.response)
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                })
        },

        hideErrors() {
            this.errors = []
        },

        hideSuccess() {
            this.showSuccess = false
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

    props: {
        grupo: Object,
        url: String,
        method: String,
        successMessage: String,
    },
}
</script>
<style type="text/css">
.ankaCropper a {
    box-sizing: content-box;
}

.ankaCropper svg {
    vertical-align: unset;
}

.ankaCropper__saveButton {
    display: flex !important;
    align-items: center;
}

.form .img-check {
    width: 80px;
    margin: 5px;
    height: 80px;
}
</style>
