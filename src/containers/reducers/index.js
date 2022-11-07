import { combineReducers } from 'redux';
import countReducers from '../count_reducers';

export default combineReducers({
    countStore: countReducers,
});
