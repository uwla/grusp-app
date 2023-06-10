export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'grusp-app',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        // Ficheiro CSS dentro do projeto
        '~/assets/css/main.css',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/vue-multiselect.js',
        '~/plugins/vue-anka-cropper.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        'bootstrap-vue/nuxt',
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    baseURL: "http://grusp.test",

    // MODULES
    axios: {
        credentials: true,
    },

    auth: {
        strategies: {
            local: {
                provider: 'local',
                endpoints: {
                    login:  { url: '/auth/login', method: 'post' },
                    logout: { url: '/auth/logout', method: 'post' },
                    user:   { url: '/account/profile', method: 'get' }
                },
                token: {
                    property: 'token',
                    type: 'Bearer',
                    required: true,
                },
                user: {
                    property: false,
                    autoFetch: false,
                }
            },
        },
        redirect: {
                login: '/conta/entrar',
                logout: '/conta/entrar',
                home: '/perfil'
        }
    },

    bootstrapVue: {
        icons: true,
    },

    // telemetry
    telemetry: false
}
