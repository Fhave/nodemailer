const express = require('express');
const controller = require('./controller');
const contact = require('./route');
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/contact', contact)

const port = 3000
app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})