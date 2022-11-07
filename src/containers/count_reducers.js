import { count } from './constants';

const defaultState = {
    count: 0,
};

export default function countReducers(state = defaultState, { type, payload }) {
    switch (type) {
    case count.ADD_COUNT:
    case count.SUB_COUNT:
        return {
            ...state,
            ...payload,
        };
    default:
        return { ...state };
    }
}
