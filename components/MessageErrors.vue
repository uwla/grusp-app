<template>
    <div class="alert errors">
        <button class="dismiss" aria-label="Close" @click="hide()">
            <span aria-hidden="true">×</span>
        </button>
        <ul>
            <li v-for="error,i in errors" :key="i">
                {{ error }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        hide() {
            this.$emit('hide')
        }
    },
    props: {
        errors: Array,
    }
}
</script>
