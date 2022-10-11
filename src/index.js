import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import App from './containers/app';

function Root() {
    return (
        <Provider store={store}>
            <App name="wtw" />
        </Provider>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<Root />);
