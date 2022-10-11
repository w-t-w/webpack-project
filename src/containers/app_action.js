import * as constants from '../constants';

function add(payload) {
    return {
        type: constants.actionTypes.app.add,
        payload,
    };
}

function shift(payload) {
    return {
        type: constants.actionTypes.app.shift,
        payload,
    };
}

export {
    add,
    shift,
};
