const express = require('express');
const db = require('./data/accounts-model')

const server = express();

// your code here

server.use(express.json());


server.get("/api/accounts", (req, res) => {
    db.find()
      .then(accounts => res.status(201).json(accounts))
      .catch(err =>
        res.status(500).json({ message: "Error getting users posts" })
      );
  });

  server.post("/api/accounts", (req, res) => {
    db.add(req.body).then(response => res.status(201).json({ message: 'successful post'}))
  });

module.exports = server;