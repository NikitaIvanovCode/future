const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
    const { mode = 'development' } = env;

    const isProd = mode === 'production';
    const isDev = mode === 'development';

    const getStyleLoaders = () => {
        return [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
        ]
    };

    const getPlugins = () => {
        const plugins = [
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            }),
        ]

        if (isProd) {
            plugins.push(new MiniCssExtractPlugin({
                filename: '[name]-[hash:4].css'
            }))
        }

        return plugins;
    };

    return {
        mode: isProd ? 'production' : isDev && 'development',

        output: {
            filename: isProd ? 'main-[hash:4].js' : undefined
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    use: getStyleLoaders()
                },
                {
                    test: /\.(sass|scss)$/,
                    use: [...getStyleLoaders(), 'sass-loader']
                },
                {
                    test: /\.(jpg|png|jpeg|gif|icon|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                                name: '[name]-[hash:4].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(ttf|otf|eot|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'fonts',
                                name: '[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },

        plugins: getPlugins(),

        devServer: {
            open: true,
            historyApiFallback: true
        }
    }
};