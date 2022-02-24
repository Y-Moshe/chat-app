const appVersion = Math.round( require('../package.json').version.slice( 0, 3 ));
const getFileType = mimeType => (mimeType.match(/\/\w+/ig))[0].slice(1);

module.exports = {
  appVersion,
  getFileType
};
