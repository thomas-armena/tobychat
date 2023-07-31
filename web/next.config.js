const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
    experimental: {
         externalDir: true,
    },
    webpack(config, { defaultLoaders }) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        config.module.rules.push({
            test: /\.+(ts|tsx)$/,
            use: defaultLoaders.babel,
            include: [path.resolve(__dirname, '..', 'common')],
        })

        config.resolve = {
            ...config.resolve,
            modules: [
                ...config.resolve.modules,
                path.resolve(__dirname, 'node_modules')
            ],
            symlinks: false,
        }

        return config;
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/login",
                permanent: true,
            },
        ];
    },

};
