const multer = require('multer');

const { UPLOADS_FOLDER, getFileType } = require('../utils');

const storage = multer.diskStorage({
  destination: ( req, file, cb ) => cb( null, UPLOADS_FOLDER ),
  filename: ( req, file, cb ) => {
    const fileName  = file.originalname.slice(0, file.originalname.lastIndexOf('.'));
    const extension = getFileType( file.mimetype );

    const fullFileName = fileName.concat( '-', Date.now(), '.', extension );
    cb( null, fullFileName );
  }
});

module.exports = {
  upload: multer({ storage })
};
