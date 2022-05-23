import path from 'path';

import { version } from '../../package.json';
import CustomError from './custom-error';
import isValidId   from './is-valid-id';

const APP_VERSION    =  Math.round( Number( version.slice( 0, 3 )) );
const BASE_URI       = `/api/v${ APP_VERSION }`;
const UPLOADS_FOLDER = path.join( __dirname, '../uploads' );
const getFileType    = ( mimeType: string ) => ( mimeType.match(/\/\w+/ig) )[0].slice(1);

export {
  APP_VERSION,
  BASE_URI,
  UPLOADS_FOLDER,

  isValidId,
  getFileType,

  CustomError
}
