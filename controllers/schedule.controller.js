const db = require('../models');
const Schedule = db.schedules;

exports.findAll = (req, res) => {
  Schedule.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching all entries"
      });
    });
};

exports.save = (req, res) => {

  const schedule = new Schedule({
    name: req.body.name
  });

  let op;
  if (req.body._id) {
    schedule._id = req.body._id,
      op = Schedule.findOneAndUpdate({ _id: req.body._id }, schedule, {
        new: true,
        upsert: true
      });
  } else {
    op = schedule.save();
  }

  op.then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating entry"
      });
    });
}

exports.delete = (req, res) => {
  const id = req.params.id;

  Schedule.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404)
          .send({
            message: "Cannot delete entity with id: ${id}. Maybe the entity was not found"
          });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500)
        .send({
          message: err.message || "Could not delete entity with id: " + id
        });
    });
};