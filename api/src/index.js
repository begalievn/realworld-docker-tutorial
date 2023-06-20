const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { connectDb } = require('./helpers/db');
const { host, port, db, authApiUrl } = require('./configuration');
const app = express();

console.log('PORT', process.env.PORT);

const postSchema = new mongoose.Schema({
  name: String
});

const Post = mongoose.model('Post', postSchema);


const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our database ${db}`);
    console.log(`Saved with volumes!`);

    Post.find(function (err, posts) {
      if (err) return console.error(err);
      console.log(posts);
    })

  });
}

app.get('/test', (req, res) => {
  res.send('Our api server is working correctly!');
});

app.get('/testapidata', (req, res) => {
  res.json({
    testapi: true,
  })
});

app.get('/testwithcurrentuser', async (req, res) => {
  console.log('authApiUrl', authApiUrl);
  axios.get(authApiUrl + "/current-user").then(response => {
    res.json({
      testwithcurrentuser: true,
      currentUserFromAuth: response.data,
    })
  })
  
})

connectDb()
  .on('error', console.log)
  .on('disconnect', connectDb)
  .once('open', startServer);
