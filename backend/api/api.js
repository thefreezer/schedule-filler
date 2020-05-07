const api = require("express").Router();

api.get("/", (req,res) => {
  res.json({message: "Api Response "});
});

module.exports = api;
