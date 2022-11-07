import { useCallback } from 'react';
import { connect } from 'react-redux';

import * as countActions from './count_actions';
import { luffy, zero } from '../assets/images';

function App({ countStore, add, sub }) {
    const { count } = countStore;
    const addHandler = useCallback(() => {
        add(count + 1);
    }, [count]);

    const subHandler = useCallback(() => {
        sub(count - 1);
    }, [count]);

    return (
        <div>
            <input type="text" disabled value={count} />
            <button type="button" onClick={addHandler}>+</button>
            <button type="button" onClick={subHandler}>-</button>
            <img src={luffy} alt="luffy" />
            <img src={zero} alt="zero" />
        </div>
    );
}

export default connect((state) => ({
    countStore: state.countStore,
}), (dispatch) => ({
    add(count) {
        dispatch(countActions.addCount({ count }));
    },
    sub(count) {
        dispatch(countActions.subCount({ count }));
    },
}))(App);
