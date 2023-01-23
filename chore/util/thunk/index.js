const prompt = require('../../config/prompt');
const combineConfig = require('./combineConfig');

// thunk
const Thunk = (fn) => (...args) => (callback) => fn(...args, callback);
// prompt thunk
const promptThunk = (fn) => (...args) => {
    const resultConfig = combineConfig(args);
    return fn({ ...prompt.config, ...resultConfig });
};
// run
const run = (taskRun) => {
    const task = taskRun();

    function next(err, data) {
        if (err) task.throw(err);
        const { value, done } = task.next(data);
        if (done) return true;
        if (typeof value === 'function') {
            value(next);
        } else {
            const promise = Promise.resolve(value);
            promise.then((y) => {
                next(null, y);
            }, (reason) => {
                next(reason);
            });
        }
    }

    next();
};
// promise run
const promiseRun = (taskRun) => new Promise((resolve, reject) => {
    const task = taskRun();

    function next(err, data) {
        if (err) return reject(task.throw(err));
        const { value, done } = task.next(data);
        if (done) return resolve(value);
        if (typeof value === 'function') {
            value(next);
        } else {
            const promise = Promise.resolve(value);
            promise.then((y) => {
                next(null, y);
            }, (reason) => {
                next(reason);
            });
        }
    }

    next();
});

module.exports = {
    Thunk,
    promptThunk,
    run,
    promiseRun,
};
