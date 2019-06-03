const express = require("express");
const db = require("./data/accounts-model");

const server = express();

// your code here

server.use(express.json());

server.get("/api/accounts", (req, res) => {
  db.find()
    .then(accounts => res.status(201).json(accounts))
    .catch(err =>
      res
        .status(500)
        .json({ message: "Error getting users posts" })
        .catch(err =>
          res.status(500).json({ message: "Could not load accounts" })
        )
    );
});

server.get("/api/accounts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(account => res.status(201).json(account))
    .catch(err => res.status(500).json({ message: "Could not load account." }));
});

server.post("/api/accounts", (req, res) => {
  db.add(req.body).then(response =>
    res
      .status(201)
      .json({ message: "Account added succesfully!" })
      .catch(err => res.status(500).json({ message: "Could not add account." }))
  );
});

server.delete("/api/accounts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id).then(response =>
    res
      .status(201)
      .json({ message: "Account successfully deleted." })
      .catch(err =>
        res.status(500).json({ message: "Could not delete account." })
      )
  );
});

server.put("/api/accounts/:id", (req, res) => {
  const { id } = req.params;
  db.update(id, req.body).then(rersponse =>
    res
      .status(201)
      .json({ message: "Account successfully updated!" })
      .catch(err =>
        res.status(500).json({ message: "Could not modify account." })
      )
  );
});

module.exports = server;
