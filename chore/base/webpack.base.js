const { resolve } = require('path');
const glob = require('glob');
const webpack = require('webpack');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const PurgeCSSWebpackPlugin = require('purgecss-webpack-plugin').PurgeCSSPlugin;
const EslintWebpackPlugin = require('eslint-webpack-plugin');

const { setSMPA, mobileLoader } = require('./utils');

const OUTPUT_DIR = resolve(process.cwd(), './build');
const MANIFEST_DIR = resolve(process.cwd(), OUTPUT_DIR, './vendors/manifest.json');

module.exports = function baseConfig(env) {
    const { mobile = '' } = env;
    const {
        entry,
        htmlWebpackPlugin,
    } = setSMPA(mobile);
    const mobileLoaderConfig = mobileLoader(mobile);
    return {
        entry,
        output: {
            publicPath: '',
            path: OUTPUT_DIR,
            filename: 'js/[name].[fullhash].js',
            chunkFilename: 'js/[name].[fullhash].js',
        },
        resolve: {
            extensions: ['.js', '.ts', '.css', '.less'],
        },
        stats: {
            preset: 'minimal',
        },
        optimization: {
            minimizer: [
                new CSSMinimizerWebpackPlugin(),
                new ImageMinimizerWebpackPlugin({
                    minimizer: {
                        implementation: ImageMinimizerWebpackPlugin.imageminMinify,
                        options: {
                            plugins: [
                                ['gifsicle', { interlaced: true }],
                                ['jpegtran', { progressive: true }],
                                ['optipng', { optimizationLevel: 5 }],
                                [
                                    'svgo',
                                    {
                                        plugins: [
                                            {
                                                name: 'preset-default',
                                                params: {
                                                    overrides: {
                                                        removeViewBox: false,
                                                        addAttributesToSVGElement: {
                                                            params: {
                                                                attributes: [
                                                                    { xmlns: 'http://www.w3.org/2000/svg' },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                ],
                            ],
                        },
                    },
                }),
                '...',
            ],
            splitChunks: {
                chunks: 'all',
                minChunks: 2,
                minSize: 20 * 1024,
                cacheGroups: {
                    commons: {
                        chunks: 'all',
                        minChunks: 2,
                        minSize: 5 * 1024,
                        name: 'commons',
                        priority: 10,
                    },
                },
            },
        },
        module: {
            rules: [{
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'thread-loader'
                }, {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                }],
            }, {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                    },
                }, mobileLoaderConfig.loader, {
                    loader: 'postcss-loader',
                    options: mobileLoaderConfig.options,
                }],
            }, {
                test: /\.less$/,
                use: [MiniCSSExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 3,
                    },
                }, mobileLoaderConfig.loader, {
                    loader: 'postcss-loader',
                    options: mobileLoaderConfig.options,
                }, {
                    loader: 'less-loader',
                }],
            }, {
                test: /\.(jpg|jpeg|png|gif|bmp)$/,
                type: 'asset',
                generator: {
                    publicPath: './',
                    filename: 'asset/images/[name].[hash:6][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 50 * 1024,
                    },
                },
            }, {
                test: /\.(otf|ttf|woff|woff2|otc)$/,
                type: 'asset',
                generator: {
                    publicPath: '../',
                    filename: 'asset/fonts/[name].[hash:6][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024,
                    },
                },
            }],
        },
        plugins: [
            new MiniCSSExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: MANIFEST_DIR,
            }),
            new PurgeCSSWebpackPlugin({
                paths: glob.sync(resolve(process.cwd(), './src/**/'), { nodir: true }),
            }),
            new EslintWebpackPlugin(),
            ...htmlWebpackPlugin,
        ],
    };
};
