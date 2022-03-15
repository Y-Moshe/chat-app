const path = require('path');

const appVersion = Math.round( require('../package.json').version.slice( 0, 3 ));
const getFileType = mimeType => (mimeType.match(/\/\w+/ig))[0].slice(1);
const CustomError = require( './custom-error' );
const isValidId = require( './is-valid-id' );
const BASE_URI = `/api/v${ appVersion }`;
const UPLOADS_FOLDER = path.join( __dirname, '../uploads' );

module.exports = {
  appVersion,
  getFileType,
  CustomError,
  isValidId,
  BASE_URI,
  UPLOADS_FOLDER
};
