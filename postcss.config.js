module.exports = {
    plugins: {
        'css-mqpacker': require('css-mqpacker')({
            sort: true
        }),
        'cssnano': require('cssnano')({
            autoprefixer: {
                add: true,
                remove: false
            }
        })
    }
};
