const express = require('express');
const userRouter = require('./routes/User');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/auth/', userRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('connected');
});
module.exports = app;
