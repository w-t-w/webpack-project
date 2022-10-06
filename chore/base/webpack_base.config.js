const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const PurgeCSSWebpackPlugin = require('purgecss-webpack-plugin').PurgeCSSPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const OUTPUT_DIR = path.resolve(process.cwd(), 'build');
const STYLE_DIR = path.resolve(process.cwd(), 'src');
const MANIFEST_DIR = path.resolve(process.cwd(), 'dist');

const { entry, htmlWebpackPlugin } = require('./s_mpa');

const baseConfig = {
    entry,
    output: {
        publicPath: '',
        path: OUTPUT_DIR,
        filename: '[name].[fullhash].js',
        chunkFilename: '[name].[fullhash].js',
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
                    importLoaders: 1,
                },
            }, {
                loader: 'postcss-loader',
            }],
        }, {
            test: /\.less$/,
            use: [MiniCSSExtractPlugin.loader, {
                loader: 'css-loader',
                options: {
                    importLoaders: 2,
                },
            }, {
                loader: 'postcss-loader',
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
        new webpack.DllReferencePlugin({
            manifest: path.join(MANIFEST_DIR, 'manifest.json'),
        }),
        new MiniCSSExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new PurgeCSSWebpackPlugin({
            paths: glob.sync(`${STYLE_DIR}/**/*`, { nodir: true }),
        }),
        new CleanWebpackPlugin(),
        ...htmlWebpackPlugin,
    ],
    stats: {
        preset: 'minimal',
    },
};

module.exports = baseConfig;
