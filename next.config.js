const webpack = require('webpack')
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production';
const withOptimizedImages = require('next-optimized-images');
// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

const nextConfig = {
    webpack: (config, { dev }) => {
        config.plugins.push(
            new webpack.EnvironmentPlugin(process.env),
        );
        
        // config.resolve.alias['components'] = path.join(__dirname, 'components')
        // config.resolve.alias['static'] = path.join(__dirname, 'static')

        return config;
    },
};

module.exports = withOptimizedImages([
    [optimizedImages, {
        handleImages: ['jpeg', 'png'],
    }],
    ],
    nextConfig
);