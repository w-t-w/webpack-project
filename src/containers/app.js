import { useCallback } from 'react';
import { connect } from 'react-redux';

import { add, shift } from './app_action';

import './app.less';

function App(props) {
    const {
        app,
        addCount,
        shiftCount,
    } = props;
    const {
        count = 0,
    } = app;
    const addCountCallback = useCallback(() => {
        addCount(count + 1);
    }, [count]);
    const shiftCountCallback = useCallback(() => {
        shiftCount(count - 1);
    }, [count]);
    return (
        <section>
            <input value={count} disabled />
            <button type="button" onClick={addCountCallback}>+</button>
            <button type="button" onClick={shiftCountCallback}>-</button>
        </section>
    );
}

export default connect((state, ownProps) => ({
    ...state,
    ...ownProps,
}), (dispatch) => ({
    addCount(count) {
        dispatch(add({ count }));
    },
    shiftCount(count) {
        dispatch(shift({ count }));
    },
}))(App);
