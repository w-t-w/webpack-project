const open = require('open');
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PurgeCSSWebpackPlugin = require('purgecss-webpack-plugin').PurgeCSSPlugin;

const { ZipPlugin } = require('./plugin');

const { prompt: { mobileEnum } } = require('../config');
const { sMpa } = require('./util');

const OUTPUT_DIR = path.resolve(process.cwd(), './build');
const MANIFEST_DIR = path.resolve(OUTPUT_DIR, './vendors/manifest.json');
const STATIC_DIR = OUTPUT_DIR;
const NEXT_LOADER_PATH = path.resolve(process.cwd(), './chore/base/loader/categories/nextLoader.js');

module.exports = ({ env: mode, mobile }) => {
    let remConfig = null;
    let vwConfig = null;

    const { entry, htmlWebpackPlugin } = sMpa({ mobile });

    /**
     * rem 配置
     * @type {{loader: string, options: {remPrecision: number, remUnit: number}}|{loader: string}}
     */
    remConfig = mobile === mobileEnum.rem ? {
        loader: 'px2rem-loader',
        options: {
            remUnit: 75,
            remPrecision: 8,
        },
    } : {
        loader: NEXT_LOADER_PATH,
    };

    /**
     * vw/vh 配置
     * @type {{postcssOptions: {plugins: {}}}|{}}
     */
    vwConfig = mobile === mobileEnum.vw ? {
        postcssOptions: {
            plugins: {
                'postcss-px-to-viewport': {
                    unitToConvert: 'px',
                    viewportUnit: 'vw',
                    viewportWidth: 750,
                    unitPrecision: 8,
                },
            },
        },
    } : {};

    return {
        mode,
        devtool: 'cheap-module-source-map',
        stats: {
            preset: 'minimal',
            colors: true,
            children: true,
        },
        devServer: {
            static: STATIC_DIR,
            historyApiFallback: true,
            hot: true,
            compress: true,
            open: {
                app: {
                    name: open.apps.chrome,
                },
            },
            proxy: {},
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                minChunks: 2,
                minSize: 10 * 1024,
                cacheGroups: {
                    common: {
                        name: 'common',
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
        resolve: {
            extensions: ['.js', '.ts', '.jsx', '.tsx'],
        },
        externals: {
            jquery: 'jQuery',
        },
        entry,
        output: {
            publicPath: '',
            path: OUTPUT_DIR,
            filename: 'js/[name].[fullhash].js',
            chunkFilename: 'js/[name].[fullhash].js',
        },
        module: {
            rules: [{
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'thread-loader',
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
                }, remConfig, {
                    loader: 'postcss-loader',
                    options: vwConfig,
                }],
            }, {
                test: /\.less$/,
                use: [MiniCSSExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 3,
                    },
                }, remConfig, {
                    loader: 'postcss-loader',
                    options: vwConfig,
                }, {
                    loader: 'less-loader',
                }],
            }, {
                test: /\.sass$/,
                use: [MiniCSSExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 3,
                    },
                }, remConfig, {
                    loader: 'postcss-loader',
                    options: vwConfig,
                }, {
                    loader: 'sass-loader',
                }],
            }, {
                test: /\.(jpg|jpeg|png|gif|bmp)$/,
                type: 'asset',
                generator: {
                    publicPath: '',
                    filename: 'assets/images/[name].[contenthash:6][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            }, {
                test: /\.(ttc|ttf|tof|woff|woff2|otc|otf)$/,
                type: 'asset',
                generator: {
                    publicPath: '',
                    filename: 'assets/fonts/[name].[contenthash:6][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024,
                    },
                },
            }],
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: MANIFEST_DIR,
            }),
            new MiniCSSExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
            new EslintWebpackPlugin(),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    '*/*',
                    '!vendors/*',
                ],
            }),
            new PurgeCSSWebpackPlugin({
                paths: glob.sync(path.resolve(process.cwd(), './src/**'), { nodir: true }),
            }),
            new ZipPlugin('wtw_zip'),
            ...htmlWebpackPlugin,
        ],
    };
};
