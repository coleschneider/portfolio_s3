'use strict';

const tsc = require('typescript');
const babelJest = require('babel-jest');

module.exports = {
  process(src, path) {
    // Because we're importing SCSS files along with our JS, we want to make sure that the preprocessor
    // does NOT pick them up.
    if (path.endsWith('.scss')) {
      return '';
    }

    let tempSrc = src;
    let tscOutput;
    const isTypescript = path.endsWith('.ts') || path.endsWith('.tsx');

    // If it's typescript, we first want to transpile back to ES2015.
    if (isTypescript) {
      tscOutput = tsc.transpileModule(
        tempSrc,
        {
          compilerOptions: {
            module: tsc.ModuleKind.CommonJS,
            jsx: tsc.JsxEmit.React,
            sourceMap: true
          },
          fileName: path
        }
      );
      tempSrc = tscOutput.outputText;
    }

    // If it's typescript OR js, we want to transpile back to ES5.
    if (isTypescript || path.endsWith('.js') || path.endsWith('.jsx')) {
      tempSrc = babelJest.process(tempSrc, path, { moduleFileExtensions: [] });
    }

    if (tscOutput) {
      return {
        code: tempSrc,
        map: JSON.parse(tscOutput.sourceMapText)
      };
    }

    return tempSrc;
  },
};
