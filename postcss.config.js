module.exports = {
    plugins: {
        'css-mqpacker': {
            sort: true
        },
        'cssnano': {
            preset: [
                'advanced',
                {
                    autoprefixer: {
                        add: true,
                        remove: false
                    }
                }
            ]
        }
    }
};
