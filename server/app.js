const express = require('express');
const router = require('./routes/User');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/Users', router);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('connected');
});
module.exports = app;
