const glob = require('glob-all');

// eslint-disable-next-line
describe('start html file test~', () => {
    // eslint-disable-next-line
    it('Determine whether there is an html file in the directory content of the location where the build is packaged and exported~', (done) => {
        const files = glob.sync([
            './build/**/index.html',
        ]);
        if (files.length > 0) {
            console.log('    Test case passed~');
            done();
        } else {
            done('No html file export detected~');
        }
    });
});
