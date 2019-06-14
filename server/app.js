const express = require('express');
const userRouter = require('./routes/User');
const carRouter = require('./routes/Car');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/auth/', userRouter);
app.use('/api/v1/', carRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('connected');
});
module.exports = app;
