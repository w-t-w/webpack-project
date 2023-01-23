import { createRoot } from 'react-dom';

import assets from '../../assets';
import utils from '../../utils';

import '../../styles/index.less';

function App() {
    const isBase64Config = (image, path) => (utils.images.isBase64(image) ? '' : path);

    return (
        <div className="container">
            <img src={`${isBase64Config(assets.images.luffy, window.hackPath)}${assets.images.luffy}`} alt="luffy" />
            1234567890
            <img src={`${isBase64Config(assets.images.zero, window.hackPath)}${assets.images.zero}`} alt="zero" />
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
