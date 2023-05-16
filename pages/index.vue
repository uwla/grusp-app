<template>
    <main>
        <h1>GRUSP</h1>
        <div class="grupo" v-for="grupo,i in grupos" :key="i">
            <h3 class="grupo-title">
                {{ grupo.titulo }}
            </h3>
            <p class="grupo-description">
                {{ grupo.descricao }}
            </p>
            <div class="grupo-tags">
                <button class="grupo-tag" v-for="tag,i in grupo.tags" :key="i">
                    {{ tag }}
                </button>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({ $axios }) {
        const response = await $axios.get('http://localhost:8000/api/public/grupos')
        const data = {
            grupos: response.data
        };
        return data;
    }
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
