class NextPlugin {
    // eslint-disable-next-line
    apply(compiler) {
        compiler.hooks.run.tapAsync('NextPlugin', (source, callback) => {
            callback();
        });
    }
}

module.exports = NextPlugin;
