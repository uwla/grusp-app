<template>
    <div>
        <!-- title -->
        <h1>{{ grupo.titulo }}</h1>

        <!-- main image -->
        <b-img v-if="img" :src="img" center />

        <!-- description -->
        <b>Descrição:</b>
        <p>{{ grupo.descricao }}</p>

        <!-- carousel -->
        <div v-if="images.length > 0">
            <b>Mais imagens:</b>
            <b-carousel :interval="0" controls indicators background="black">
                <b-carousel-slide v-for="image,i in images" :key="i"
                    :img-src="image"
                    img-height="250px" />
            </b-carousel>
            <br/>
        </div>

        <!-- tags -->
        <b>Tags:</b>
        <grupo-tags :tags="grupo.tags" />
    </div>
</template>

<script>
// silly fix for working locally (will be removed later)
function fixImageUrl(img) {
    return img.replace("localhost/", "localhost:8000/")
}

export default {
    computed: {
        img() {
            return fixImageUrl(this.grupo.img)
        },
        images() {
            return this.grupo.images.map(fixImageUrl)
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
