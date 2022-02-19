// build your `/api/resources` router here
const express = require("express");
const router = express.Router();
const Resources = require("./model");

router.get("/", (req, res, next) => {
  Resources.getAll()
    .then((resource) => {
      res.status(200).json(resource);
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  try {
    const newResource = await Resources.create(req.body);
    res.status(201).json(newResource);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
