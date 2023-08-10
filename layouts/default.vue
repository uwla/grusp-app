<template>
    <div>
        <navbar />
        <Nuxt />
        <site-footer />
    </div>
</template>
<script>
export default {
    mounted() {
        // Get the h1 tag
        var h1Element = document.querySelector('h1');

        // not found
        if (! h1Element)
            return

        // the text of the h1
        var h1Text = h1Element.textContent.toLowerCase();

        // Get the contents of the h1 tag
        if (h1Text !== 'grusp')
            document.title = `GRUSP - ${h1Text}`
    },
}
</script>
