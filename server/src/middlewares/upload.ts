import multer from 'multer';

import { UPLOADS_FOLDER, getFileType } from '../utils';

const storage = multer.diskStorage({
  destination: ( req, file, cb ) => cb( null, UPLOADS_FOLDER ),
  filename:    ( req, file, cb ) => {
    const fileName  = file.originalname.slice(0, file.originalname.lastIndexOf('.'));
    const extension = getFileType( file.mimetype );

    const fullFileName = fileName.concat( '-', Date.now().toString(), '.', extension );
    cb( null, fullFileName );
  }
});

export default multer({ storage });
