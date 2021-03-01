const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

let ID = 0;
function createAsset(filename) {
    //第一步  读取文件内容
    const content = fs.readFileSync(filename, 'utf-8');

    const ast = parser.parse(content, {
        //这里的坑  默认不支持module
        sourceType: 'module',
    });

    const dependencies = [];

    //获取依赖路径
    traverse(ast, {
        ImportDeclaration: ({ node }) => {
            dependencies.push(node.source.value);
        },
    });

    //从es6-es5
    const { code } = babel.transformFromAstSync(ast, null, {
        presets: ['@babel/preset-env'],
    });

    let id = ID++;

    return {
        id,
        filename,
        code,
        dependencies,
    };
}

function createGarph(entry) {
    const mainAsset = createAsset(entry);

    const queue = [mainAsset];

    for (const asset of queue) {
        const dirname = path.dirname(asset.filename);

        asset.mapping = {};
        //循环处理依赖
        asset.dependencies.forEach((relativePath) => {
            const absolutePath = path.join(dirname, relativePath);
            const child = createAsset(absolutePath);
            queue.push(child);
            asset.mapping[relativePath] = child.id;
        });
    }
    return queue;
}

//打包到bundle.js
function bundle(graph) {
    let modules = '';
    graph.forEach((mod) => {
        modules += `
            ${mod.id}:[
                function(require,module,exports){
                    ${mod.code}
                },
                ${JSON.stringify(mod.mapping)}
            ],
        `;
    });
    const result = `
        (function(modules){
            function require(id){
                const [fn,mapping] = modules[id];

                function localRequire(relativePath){
                   return require(mapping[relativePath])
                }

                const module = {
                    exports:{}
                };

                fn(localRequire,module,module.exports);

                return module.exports
            }
            require(0);
        })(${modules})
    `;
    return result;
}

const graph = createGarph('./src/index.js');
const result = bundle(graph);
console.log(result);
