const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

const users = [
  { id: "0", name: "Marcin", email: "marcin@test.test" },
  { id: "1", name: "Piotr", email: "piotr@test.test" },
  { id: "2", name: "Kasia", email: "kasia@test.test" },
  { id: "3", name: "Adam", email: "adam@test.test" },
];

app.get("/users", (req, res) => {
  try {
    res.status(200).json(users);
  } catch (e) {
    res.status(500).send("Error:" + e);
  }
});

app.get("/users/:id", (req, res) => {
  try {
    const user = users.find((user) => user.id === req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    res.status(500).send("Error:" + e);
  }
});

app.post("/users", (req, res) => {
  try {
    const newUser = {
      id: `${users.length}`,
      name: req.body.name,
      email: req.body.email,
    };
    if (
      !newUser.name ||
      !newUser.email ||
      newUser.name === "" ||
      newUser.email === "" ||
      typeof newUser.name !== "string" ||
      typeof newUser.email !== "string"
    ) {
      return res
        .status(400)
        .send("Name and email have been passed incorrectly");
    }
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).send("Error" + e);
  }
});

app.put("/users/:id", (req, res) => {
  try {
    const user = users.find((u) => u.id === req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    res.status(500).send("Error:" + e);
  }
});

app.delete("/users/:id", (req, res) => {
  try {
    const userIndex = users.findIndex((u) => u.id === req.params.id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.status(200).send("User deleted");
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    res.status(500).send("Error" + e);
  }
});

if (!(process.env.JEST_WORKER_ID !== undefined)) {
  app.listen(port, () => {
    console.log(`Running on: ${port}`);
  });
}

module.exports = { app, users };
