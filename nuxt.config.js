const description = 'Catálogo de Grupos da USP'
const title = 'GRUSP'
const siteLang = 'pt'
const siteName = 'GRUSP'
const siteUrl = 'https://grusp.site'
const siteImg =
    '/561df5ce8e2a622b784ac7244752ce9c52dec727a4f9fd5021396d4fbb681904.png'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: siteName,
        htmlAttrs: {
            lang: siteLang,
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: description },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'image', content: siteImg },
            { name: 'locale', content: 'pt' },
            { name: 'robots', content: 'index, follow' },
            { name: 'site_name', content: siteName },
            { name: 'url', content: siteUrl },
            { name: 'twitter:card', content: 'Large' },
            { name: 'description', content: description },
            { name: 'twitter:description', content: description },
            { name: 'twitter:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:title', content: title },
            { name: 'twitter:image', content: siteImg },
            { property: 'og:image', content: siteImg },
            { property: 'og:locale', content: 'pt_BR' },
            { property: 'og:site_name', content: siteName },
            { property: 'og:url', content: siteUrl },
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/png',
                href: '/favicon-16x16.png',
                sizes: '16x16',
            },
            {
                rel: 'icon',
                type: 'image/png',
                href: '/favicon-32x32.png',
                sizes: '32x32',
            },
            {
                rel: 'apple-touch-icon',
                href: '/apple-touch-icon.png',
                sizes: '180x180',
            },
            { rel: 'manifest', href: '/site.webmanifest' },
            { rel: 'image_src', href: siteImg },
            { rel: 'canonical', href: siteUrl },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        // Ficheiro CSS dentro do projeto
        '~/assets/css/main.css',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/vue-multiselect.js', '~/plugins/vue-anka-cropper.js'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', 'bootstrap-vue/nuxt'],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        optimizeCSS: true,
        extractCSS: true,
    },

    // MODULES
    axios: {
        credentials: true,

        // Axios interceptor to add the bearer token to requests
        interceptors: {
            request: config => {
                const token = $auth.strategy.token.get()
                if (token) {
                    config.headers.common['Authorization'] = `Bearer ${token}`
                }
                return config
            },
        },
    },

    auth: {
        strategies: {
            local: {
                provider: 'local',
                endpoints: {
                    login: { url: '/auth/login', method: 'post' },
                    logout: { url: '/auth/logout', method: 'post' },
                    user: { url: '/account/profile', method: 'get' },
                },
                token: {
                    property: 'token',
                    type: 'Bearer',
                    required: true,
                },
                user: {
                    property: false,
                    autoFetch: false,
                },
            },
        },
        redirect: {
            login: '/conta/entrar',
            logout: '/conta/entrar',
            home: '/perfil',
        },
    },

    bootstrapVue: {
        icons: true,
    },

    // telemetry
    telemetry: false,
}
