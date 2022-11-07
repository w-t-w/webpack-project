import { createRoot } from 'react-dom/client';

import App from './app';

import './styles/index.less';

const root = createRoot(document.getElementById('root'));

root.render(<App />);
