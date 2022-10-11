import { combineReducers } from 'redux';
import app from '../containers/app_reducer';

const reducers = combineReducers({
    app,
});

export default reducers;
