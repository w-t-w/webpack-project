const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const PurgeCSSWebpackPlugin = require('purgecss-webpack-plugin').PurgeCSSPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const OUTPUT_DIR = path.resolve(process.cwd(), 'build');
const SRC_DIR = path.resolve(process.cwd(), 'src');
const MANIFEST_FILE = require(path.resolve(process.cwd(), 'build', 'vendors', 'manifest.json'));

const nextLoader = path.resolve(__dirname, './loaders/next-loader.js');

const setMobile = require('./mobile');
// eslint-disable-next-line
const setS_MPA = require('./s_mpa');

module.exports = (env) => {
    const { params: { mobile } = {} } = env;
    const mobileConfig = setMobile(mobile) || {};
    const mobileTemplateParameters = mobileConfig.templateParameters || '';

    const { entry, htmlWebpackPlugin } = setS_MPA({
        mobile: mobileTemplateParameters,
        vendors: './vendors/vendors.dll.js',
    });
    return {
        entry,
        output: {
            publicPath: '',
            path: OUTPUT_DIR,
            filename: 'js/[name].[fullhash].js',
            chunkFilename: 'js/[name].[fullhash].js',
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.css', '.less'],
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                minChunks: 2,
                minSize: 20 * 1024,
                cacheGroups: {
                    commons: {
                        name: 'commons',
                        chunks: 'all',
                        minChunks: 2,
                        minSize: 10 * 1024,
                        priority: 10,
                    },
                },
            },
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
                                // Svgo configuration here https://github.com/svg/svgo#configuration
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
        },
        module: {
            rules: [{
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'thread-loader',
                    options: {
                        workers: 8,
                    },
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
                }, mobileConfig.rules || {
                    loader: nextLoader,
                }, {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: mobileConfig.postcssOptions || {},
                    },
                }],
            }, {
                test: /\.less$/,
                use: [MiniCSSExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 3,
                    },
                }, mobileConfig.rules || {
                    loader: nextLoader,
                }, {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: mobileConfig.postcssOptions || {},
                    },
                }, {
                    loader: 'less-loader',
                }],
            }, {
                test: /\.(jpg|png|bmp|jpeg|gif|wbmp)$/,
                type: 'asset',
                generator: {
                    publicPath: './',
                    filename: 'assets/images/[name].[hash:6][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 50 * 1024,
                    },
                },
            }, {
                test: /\.(ttc|ttf|woff|woff2|otf)$/,
                type: 'asset',
                generator: {
                    publicPath: '../',
                    filename: 'assets/fonts/[name].[hash:6][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 50 * 1024,
                    },
                },
            }],
        },
        plugins: [
            new MiniCSSExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
            new PurgeCSSWebpackPlugin({
                paths: glob.sync(`${SRC_DIR}/**/*`, { nodir: true }),
            }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    '!vendors/**',
                    'js/**',
                    'css/**',
                    'assets/**',
                    '*.html',
                ],
            }),
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: MANIFEST_FILE,
            }),
            ...htmlWebpackPlugin,
        ],
        stats: {
            preset: 'minimal',
        },
    };
};
