import { createRoot } from 'react-dom/client';

import App from './containers/app';

function Root() {
    return (
        <App name="wtw" />
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<Root />);
