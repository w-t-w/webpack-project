const inquirer = require('inquirer');

const prompt = inquirer.createPromptModule();

// 创建与用户实行比较简单的互动
function createPrompt(typeProperty) {
    return prompt([{
        type: 'list',
        filter: (val) => val.toLowerCase(),
        ...typeProperty,
    }]);
}

// Promise 异步生成器
function asyncGenerator(taskRun) {
    const task = taskRun();

    let result = task.next();

    return (function step() {
        const { value, done } = result;
        if (!done) {
            const promise = Promise.resolve(value);
            promise.then((val) => {
                result = task.next(val);
                step();
            }).catch((err) => {
                result = task.throw(err);
                step();
            });
        }
    }());
}

module.exports = {
    createPrompt,
    asyncGenerator,
};
