import addViewBox from 'svgo-add-viewbox'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    js2svg: { indent: 2, pretty: true },
    plugins: [
        'preset-default', // built-in plugins enabled by default
        'convertStyleToAttrs',
        addViewBox,
        {
            name: 'inlineStyles',
            params: {
                onlyMatchedOnce: false,
            },
        },
    ],
}
