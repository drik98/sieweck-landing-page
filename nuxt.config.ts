// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  app: {
    rootTag: "body",
    rootId: "app",

    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Familie Sieweck",
      meta: [
        {
          name: "description",
          content:
            "Willkommen auf sieweck.de – besuchen Sie unsere Unterseiten.",
        },
      ],
      htmlAttrs: {
        lang: "de-DE",
      },
    },
  },

  typescript: {
    typeCheck: true,
  },

  nitro: {
    preset: "netlify-static",
  },

  modules: ["@nuxt/eslint"],
});
