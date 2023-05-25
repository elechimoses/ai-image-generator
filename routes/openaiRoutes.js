const express = require('express');
const { generateImage, createCompletion } = require('../controllers/openaiController');
const router = express.Router();

router.post('/generateimage', generateImage);
router.post('/create-completeion', createCompletion);
module.exports = router;