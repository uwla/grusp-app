<template>
    <div>
        <!-- title -->
        <h1>{{ grupo.titulo }}</h1>

        <!-- main image -->
        <div v-if="img">
            <b-img :src="img" center />
        </div>

        <!-- description -->
        <div>
            <b>Descrição:</b>
            <p>{{ grupo.descricao }}</p>
        </div>

        <!-- contato -->
        <div v-if="grupo.contato">
            <b>Informações de contato:</b>
            <p>{{ grupo.contato }}</p>
        </div>

        <!-- horário -->
        <div v-if="grupo.horario">
            <b>Informações de horário de encontro:</b>
            <p>{{ grupo.horario }}</p>
        </div>

        <!-- lugar -->
        <div v-if="grupo.lugar">
            <b>Informações sobre lugar de encontro:</b>
            <p>{{ grupo.lugar }}</p>
        </div>

       <!-- mensalidade -->
        <div v-if="grupo.mensalidade">
            <b>Informações sobre mensalidade:</b>
            <p>{{ grupo.mensalidade }}</p>
        </div>

       <!-- público alvo -->
        <div v-if="grupo.publico">
            <b>Informações sobre público alvo:</b>
            <p>{{ grupo.publico }}</p>
        </div>

       <!-- links úteis -->
        <div v-if="grupo.links">
            <b>Links úteis:</b>
            <p>{{ grupo.links }}</p>
        </div>

        <!-- carousel -->
        <div v-if="images.length > 0">
            <b>Fotos do grupo:</b>
            <b-carousel :interval="0" controls indicators background="black">
                <b-carousel-slide v-for="image,i in images" :key="i"
                    :img-src="image"
                    img-height="250px" />
            </b-carousel>
            <br/>
        </div>

        <!-- tags -->
        <div v-if="grupo.tags.length > 0">
            <b>Tags:</b>
            <grupo-tags class="mt-2" :tags="grupo.tags" />
        </div>
    </div>
</template>

<script>
// silly fix for working locally (will be removed later)
function fixImageUrl(img) {
    if (typeof img !== "string") return ""
    return img.replace("localhost/", "localhost:8000/")
}

export default {
    computed: {
        img() {
            return fixImageUrl(this.grupo.img)
        },
        images() {
            return (this.grupo.images || []).map(fixImageUrl)
        }
    },
    props: {
        grupo: Object
    }
}
</script>

<style type="text/css">
.carousel-item img {
    height: 400px !important;
    width: auto !important;
}
</style>
