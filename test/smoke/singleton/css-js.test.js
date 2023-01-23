const glob = require('glob-all');

// eslint-disable-next-line
describe('start css/javascript file test~', () => {
    // eslint-disable-next-line no-undef
    it('Determine whether there are css/javascript files in the content of the directory where the build is packaged and exported~', (done) => {
        const files = glob.sync([
            './build/js/**/*.js',
            './build/css/**/*.css',
        ]);
        if (files.length > 0) {
            console.log('    Test case passed~');
            done();
        } else {
            done('No css/javascript file export detected~');
        }
    });
});
