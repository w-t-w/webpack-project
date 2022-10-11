import { createStore, applyMiddleware, compose } from 'redux';
import thinkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { composeWithDevTools } from '@redux-devtools/extension';

import reducers from '../reducers';

const env = process.env.NODE_ENV;

const development = 'development';

let middleware = [thinkMiddleware];
const compostEnhancers = composeWithDevTools({});

if (env === development) {
    middleware = [...middleware, loggerMiddleware];
}

const runStore = compose(compostEnhancers(applyMiddleware(...middleware)))(createStore);

const store = runStore(reducers, {});

export default store;
