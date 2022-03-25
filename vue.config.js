// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/assets/styles/globals/_variables.scss";@import "~@/assets/styles/globals/_base.scss";`
            },
        }
    }
}