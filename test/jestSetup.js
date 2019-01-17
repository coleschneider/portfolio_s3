const _ = require('lodash');
// const { StyleSheetTestUtils } = require('aphrodite');
const { configure, shallow, render, mount } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

const allowedWarnings = [/(React.createElement: type should not be null)/, /(Shallow renderer has been moved)/];

console.error = message => {
  const ignoreWarning = _.some(allowedWarnings, warningRegExp => warningRegExp.test(message));
  console.log(message);
  console.log('ignoreWarning is: ', ignoreWarning);
  if (!ignoreWarning) {
    throw new Error(message);
  }
};