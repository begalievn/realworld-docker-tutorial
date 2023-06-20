const express = require('express');
const { port, host } = require('./configuration');
const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`Mail service started on port ${port}`);
    console.log(`Mail service is on host ${host}`);
  })
}

app.get('/api/check', (req, res) => {
  res.json({
    hello: 'Mail hello'
  });
})

startServer();