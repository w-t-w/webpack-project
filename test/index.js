const smoke = require('./smoke/smoke.test');

// eslint-disable-next-line
describe('start test~', () => {
    // eslint-disable-next-line
    it('start smoke test~', (done) => {
        smoke();
        done();
    });
});
