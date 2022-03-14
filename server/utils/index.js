const appVersion = Math.round( require('../package.json').version.slice( 0, 3 ));
const getFileType = mimeType => (mimeType.match(/\/\w+/ig))[0].slice(1);
const CustomError = require( './custom-error' );
const isValidId = require( './is-valid-id' );

module.exports = {
  appVersion,
  getFileType,
  CustomError,
  isValidId
};
