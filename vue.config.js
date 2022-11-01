module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/assets/default.sass"`
            }
        }
    },
    base: '/small-internet-shop/'
}