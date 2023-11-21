const ALLOWED_FILE_EXTENSIONS = ['xlsx', 'xls'];

exports.FileValid = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const fileExtension = getFileExtension(req.file.originalname);

    if (!ALLOWED_FILE_EXTENSIONS.includes(fileExtension)) {
      return res.status(400).send('Invalid file format. Only Excel files (.xlsx, .xls) are allowed.');
    }

    const fileId = req.body.id;

    if (isNaN(fileId)) {
      return res.status(400).send('ID must be a number.');
    }

    next();
  } catch (error) {
    console.error('Error validating file:', error);
    res.status(500).send('Error validating the file.');
  }
};

function getFileExtension(filename) {
  return filename.split('.').pop().toLowerCase();
}
