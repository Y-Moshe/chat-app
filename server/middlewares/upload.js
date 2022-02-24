const multer = require('multer');
const path = require('path');

const UPLOADS_FOLDER = path.join( __dirname, '../uploads' );
const { getFileType } = require('../utils')

const storage = multer.diskStorage({
  destination: ( req, file, cb ) => cb( null, UPLOADS_FOLDER ),
  filename: ( req, file, cb ) => {
    const fileName  = file.originalname.slice(0, file.originalname.lastIndexOf('.'));
    const extension = getFileType( file.mimetype );
    
    const fullFileName = fileName.concat( '-', Date.now(), '.', extension );
    req.uploadedPath = UPLOADS_FOLDER.concat( '/', fullFileName );
    cb( null, fullFileName );
  }
});

module.exports = {
  UPLOADS_FOLDER,
  upload: multer({ storage })
};
