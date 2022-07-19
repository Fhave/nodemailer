const express = require('express');
const router = express.Router();
const controller = require('./controller');

router
  .get('/', controller.getContacts)
  .post('/send', controller.sendContact);

module.exports = router;