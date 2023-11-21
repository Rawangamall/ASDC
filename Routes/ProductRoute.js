const multer = require('multer');
const ProductController = require('../Controllers/ProductController')
const express = require("express");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.route("/ProductRow")
      .post(upload.single('file'),ProductController.ProductRow)

module.exports = router;