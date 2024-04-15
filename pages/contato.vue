<template>
    <main class="w600">
        <h1>CONTATO</h1>
        <p>
            Para informações genéricas, contate
            <a href="mailto:contato@grusp.site">contato@grusp.site</a>.
        </p>
        <p>
            Para bugs ou melhorias no site, contate
            <a href="mailto:webmaster@grusp.site">webmaster@grusp.site</a>.
        </p>
    </main>
</template>

<script>
import { defineHead } from '../utils'

export default {
    head: defineHead('GRUSP - Contato', 'Contato do GRUSP - catálogo de grupos da USP'),
    name: 'PageContact',
}
</script>
