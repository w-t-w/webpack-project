const fs = require('fs');
const path = require('path');
const spritesmith = require('spritesmith');
const { getOptions } = require('loader-utils');

const BUILD_DIR = path.resolve(process.cwd(), './build');
const CSS_DIR = path.resolve(BUILD_DIR, 'css');
const ASSETS_DIR = path.resolve(BUILD_DIR, 'assets/images');

function cssTransformLoader(source) {
    // 获取传递的参数
    // const { name } = getOptions(this);
    // console.log('name', name);
    // 获取传递的参数 prefer
    // const { name } = this.options();
    // console.log(name);
    // 缓存机制
    // this.cacheable(false);
    // 回调函数
    // this.callback(null, source);
    // 异步回调函数
    // const callback = this.async();
    // callback(null, source);
    // 生成文件
    // this.emit;
    // return source;
    const spriteSmithCSSArr = [];
    const { filename } = getOptions(this);
    const callback = this.async();
    if (!fs.existsSync(BUILD_DIR)) {
        fs.mkdirSync(BUILD_DIR, { recursive: true });
        fs.mkdirSync(CSS_DIR, { recursive: true });
        fs.mkdirSync(ASSETS_DIR, { recursive: true });
    }
    const imagePoint = /\((\S+)\?sprite\)/g;
    let imagePath = null;
    let imageRealPath = null;
    let replaceImagePath = null;
    (function transformCSSArr() {
        [imageRealPath, imagePath] = imagePoint.exec(source) || [];
        // eslint-disable-next-line
        imagePath && spriteSmithCSSArr.push(path.resolve(CSS_DIR, imagePath));
        // eslint-disable-next-line
        imagePath && (replaceImagePath = imageRealPath.replace(/images[/|\\](.*)\.jpeg\?sprite\)$/, `images/${filename}.png\)`));
        // eslint-disable-next-line
        replaceImagePath && (source = source.replace(imageRealPath, replaceImagePath));
        if (imagePoint.lastIndex) transformCSSArr();
    }());
    spritesmith.run(
        { src: spriteSmithCSSArr },
        (err, { image }) => {
            if (err) console.error('error:', err);
            fs.writeFileSync(path.resolve(ASSETS_DIR, `${filename}.png`), image, 'utf-8');
            fs.writeFile(path.resolve(CSS_DIR, `${filename}.min.css`), source, 'utf-8', () => {
                callback(null, source);
            });
        },
    );
}

module.exports = cssTransformLoader;
