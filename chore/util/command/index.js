const fs = require('fs');

class Command {
    constructor() {
        this.command = [];
        this.promptCommand = [];
    }

    commonPath(commonPath, commonFile, pathChunks = []) {
        if (fs.existsSync(commonFile)) {
            return false;
        }
        const splitPathRegExp = /\/|\\/;
        const commonPathArr = commonPath.split(splitPathRegExp);
        let transformCommonPath = null;
        if (fs.existsSync(commonPath)) {
            if (pathChunks.length > 0) {
                const popPathChunks = pathChunks.pop();
                commonPathArr.push(popPathChunks);
                transformCommonPath = commonPathArr.join('/');
                fs.mkdirSync(transformCommonPath, { recursive: true });
                return this.commonPath(transformCommonPath, pathChunks);
            }
            return true;
        }
        const popPath = commonPathArr.pop();
        transformCommonPath = commonPathArr.join('/');
        pathChunks.push(popPath);
        return this.commonPath(transformCommonPath, pathChunks);
    }

    commonCommand(path, file, command) {
        if (this.commonPath(path, file)) {
            this.command.push(command);
        }
    }

    * combineCommand(combineArr) {
        const [promptPromise, config] = combineArr.shift();
        if (yield* this.combineParams(promptPromise, config)) {
            yield* this.combineCommand(combineArr);
        } else {
            this.command.push(this.promptCommand.join(' '));
        }
    }

    * combineParams(promise, config) {
        const { prompt } = yield promise();
        let promptConfig = config[prompt]
            || config[prompt.toUpperCase()]
            || config[Array.from(prompt, (item, index) => (index === 0 ? item.toUpperCase() : item)).join('')];
        if (typeof promptConfig === 'function') {
            promptConfig = promptConfig.call(config);
        }
        if (promptConfig.command) {
            this.promptCommand.push(promptConfig.command);
        }
        const { key, value } = promptConfig;
        const params = `--${key}=${value}`;
        this.promptCommand.push(params);
        return promptConfig.hasNext;
    }

    exec() {
        return this.command.join(' && ');
    }
}

module.exports = Command;
