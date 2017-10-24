const paths = require('./config/path')

const CSS_NANO_OPTIONS = {
    autoprefixer: false,
    calc: true,
    colormin: true,
    convertValues: true,
    core: true,
    discardComments: { removeAll: true },
    discardDuplicates: true,
    discardEmpty: true,
    discardOverridden: true,
    filterPlugins: false,
    functionOptimiser: true,
    mergeIdents: false,
    mergeLonghand: true,
    mergeRules: true,
    minifyFontValues: true,
    minifyGradients: true,
    minifyParams: true,
    minifySelectors: true,
    reduceIdents: false,
    reduceInitial: false,
    reducePositions: true,
    reduceTimingFunctions: true,
    reduceTransforms: true,
    zindex: false
}

module.exports = context => ({
    parser: 'postcss-scss',
    plugins: {
        'postcss-import': {
            resolve: id => `${paths.appStyle}/${id}`
        },
        'postcss-simple-vars': {},
        'postcss-strip-inline-comments': {},
        'postcss-remify': {},
        'postcss-nesting': {},
        'postcss-nested': {},
        'postcss-cssnext': {
            features: {
                autoprefixer: {
                    flexbox: false,
                    grid: false
                },
                customProperties: false
            }
        },
        cssnano:
            context.env === 'production' && !context.options.isTest
                ? CSS_NANO_OPTIONS
                : false
    }
})
