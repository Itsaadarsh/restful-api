import express from 'express';
const app = express();

app.use((req, res, next) => {
  res.json({
    msg: "It's Working!",
  });
  next();
});

app.listen(3000, () => {
  console.log('Listening at PORT 3000');
});
