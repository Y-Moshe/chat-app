const auth   = require('./auth');
const { upload } = require('./upload');
const errorHandler = require('./error-handler');

module.exports = {
  auth,
  upload,
  errorHandler
};
