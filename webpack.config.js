const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin")

const path = require("path")

module.exports = {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    resolve: {
        alias: {
            "@scripts": path.resolve(__dirname, "src/assets/javascripts"),
            "@styles": path.resolve(__dirname, "src/assets/styles"),
            "@images": path.resolve(__dirname, "src/assets/images")
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlBundlerPlugin({
            entry: "src/views/",
            js: {
                filename: "resource/js/[name].js"
            },
            css: {
                filename: "resource/styles/[name]-min.css"
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["css-loader", "sass-loader"]
            },
            {
                test: /\.(ico|png|jp?g|webp|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: "resource/images/[name][ext][query]"
                }
            }
        ]
    },
    devServer: {
        static: path.resolve(__dirname, "dist"),
        watchFiles: {
            paths: ["src/**/*.*"],
            options: {
                usePolling: true
            }
        }
    }
}
