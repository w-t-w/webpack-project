import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { composeWithDevTools } from '@redux-devtools/extension';

import reducers from '../reducers';

const NODE_ENV = process.env.NODE_ENV;

const middlewares = [thunkMiddleware].concat((NODE_ENV === 'development') ? loggerMiddleware : []);
const composeEnhancers = composeWithDevTools({});

const createMiddlewareStore = compose(
    composeEnhancers(),
    applyMiddleware(...middlewares),
)(createStore);

const store = createMiddlewareStore(reducers, {});

export default store;
