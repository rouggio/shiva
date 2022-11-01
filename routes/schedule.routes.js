module.exports = (app) => {

  const config = require("../controllers/schedule.controller.js");

  var router = require("express").Router();

  router.get("/", config.findAll);
  router.post("/", config.save);
  router.delete("/:id", config.delete);

  app.use('/api/schedule', router);

};