import * as constants from '../constants';

const initialState = {
    count: 0,
};

export default function app(state = initialState, { type, payload }) {
    switch (type) {
    case constants.actionTypes.app.add:
    case constants.actionTypes.app.shift:
        return {
            ...state,
            ...payload,
        };
    default:
        return { ...state };
    }
}
