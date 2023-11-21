const express = require("express");
const router = express.Router();
const multer = require('multer');

const ProductController = require('../Controllers/ProductController')
const ProductValication = require('../Core/Validation/FileValidation')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.route("/ProductRow")
      .post(upload.single('file'),ProductValication.FileValid,ProductController.ProductRow)

module.exports = router;