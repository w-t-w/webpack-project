const JsZip = require('jszip');
const { RawSource } = require('webpack-sources');

const jszip = new JsZip();

class ZipPlugin {
    constructor(filename) {
        this.filename = filename;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            const jsFolder = jszip.folder(`${this.filename}_container`);
            const assetsRegExp = /^js\/(index\..*\.js)$/;
            for (const filename of Object.keys(compilation.assets)) {
                if (assetsRegExp.test(filename)) {
                    jsFolder.file(filename, compilation.assets[filename].source());
                }
            }
            jszip.generateAsync({ type: 'nodebuffer' }).then((content) => {
                compilation.assets[`zip/${this.filename}.zip`] = new RawSource(content);
                callback();
            });
        });
    }
}

module.exports = ZipPlugin;
