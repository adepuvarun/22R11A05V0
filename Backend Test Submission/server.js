const express = require('express');
const bodyParser = require('body-parser');
const urlRoutes = require('./routes/urlroutes');
const Log = require('./log');

const app = express();
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  await Log("backend", "info", "route", `Incoming ${req.method} request to ${req.url}`);
  next();
});

app.use('/', urlRoutes);

app.get('/', (req, res) => {
  res.send("Backend is working!");
});

const PORT = 3000;
app.listen(PORT, () => {
  Log("backend", "info", "service", `Server running at http://localhost:${PORT}`);
});
