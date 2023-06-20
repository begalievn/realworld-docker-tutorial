const express = require('express');
const axios = require('axios');
const { connectDb } = require('./helpers/db');
const { host, port, db, apiUrl, mailUrl } = require('./configuration');
const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our database ${db}`);
  });
}

app.get('/test', (req, res) => {
  res.send('Our auth server is working correctly!');
});

app.get('/testwithapidata', (req, res) => {
  axios.get(apiUrl + '/testapidata').then(response => {
    res.send(response.data);
  })
})

app.get('/api/current-user', (req, res) => {
  res.json({
    id: 1,
    email: 'fooauth@gmail.com'
  });
})

app.get('/checkmail', (req, res) => {
  axios.get(mailUrl + '/check').then(response => {
    res.send(response.data);
  });
});

connectDb()
  .on('error', console.log)
  .on('disconnect', connectDb)
  .once('open', startServer);
