import { count } from './constants';

export function addCount(payload) {
    return {
        type: count.ADD_COUNT,
        payload,
    };
}

export function subCount(payload) {
    return {
        type: count.SUB_COUNT,
        payload,
    };
}
