import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './containers/app';
import store from './containers/stores';

import './styles/index.less';

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
