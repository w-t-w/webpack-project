// thunk
const Thunk = fn => (...args) => callback => fn(...args, callback);
const promptThunk = fn => (...args) => {

};
// thunk generator
const run = taskRun => {
    return new Promise((resolve, rejected) => {
        const task = taskRun();

        function next(err, data) {
            if (err) return rejected(task.throw(err));
            const {value, done} = task.next(data);
            if (done) return resolve(value);
            value(next);
        }

        next();
    });
};

module.exports = {
    Thunk,
    run,
    promptThunk
};