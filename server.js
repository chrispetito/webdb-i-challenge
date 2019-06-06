const express = require("express");
const db = require("./data/accounts-model");

const server = express();

// your code here

server.use(express.json());

server.get("/api/accounts", (req, res) => {
  db.find()
    .then(accounts => {
      console.log(accounts);
      res.status(200).json(accounts);
    })

    .catch(err =>
      res.status(500).json({ message: "Error getting users posts" })
    );
});

server.get("/api/accounts/:id", validateAccountId, (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => res.status(500).json({ message: "Could not load account." }));
});

server.post("/api/accounts", validateAccount, (req, res) => {
  db.add(req.body).then(response =>
    res
      .status(201)
      .json({ message: "Account added succesfully!" })
      .catch(err => res.status(500).json({ message: "Could not add account." }))
  );
});

server.delete("/api/accounts/:id", validateAccountId, (req, res) => {
  const { id } = req.params;
  db.remove(id).then(response =>
    res
      .status(200)
      .json({ message: "Account successfully deleted." })
      .catch(err =>
        res.status(500).json({ message: "Could not delete account." })
      )
  );
});

server.put("/api/accounts/:id", validateAccountId, (req, res) => {
  const { id } = req.params;
  db.update(id, validateAccount, req.body).then(rersponse =>
    res
      .status(200)
      .json({ message: "Account successfully updated!" })
      .catch(err =>
        res.status(500).json({ message: "Could not modify account." })
      )
  );
});

function validateAccount(req, res, next) {
  const { name, budget } = req.body;
  if (!name || !budget) {
    res
      .status(404)
      .json({ message: "Both the name and budget fields are required." });
  } else {
    next();
  }
}

async function validateAccountId(req, res, next) {
  const { id } = req.params;
  const action = await db.findById(id);
  if (!action) {
    res.status(404).json({ message: "Invalid Account ID" });
  } else {
    next();
  }
}

module.exports = server;
