<template>
    <div class="alert alert-success">
        <button class="dismiss" aria-label="Close" @click="hide()">
            <span aria-hidden="true">×</span>
        </button>
        {{ message }}
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
        message: String,
    }
}
</script>
