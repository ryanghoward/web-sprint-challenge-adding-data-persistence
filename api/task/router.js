// build your `/api/tasks` router here
const express = require("express");
const router = express.Router();
const Tasks = require("./model");

router.get("/", (req, res, next) => {
  Tasks.getAll()
    .then((task) => {
      // res.status(200).json(task);
      res.json(task);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  // try {
  //   const newTask = await Tasks.create(req.body);
  //   res.status(201).json({
  //     task_id: newTask.task_id,
  //     task_description: newTask.task_description,
  //     task_notes: newTask.task_notes,
  //     task_completed: newTask.task_completed !== 0,
  //     project_id: newTask.project_id,
  //   });
  // } catch (err) {
  //   next(err);
  // }
  Tasks.create(req.body)
    .then((newTask) => {
      res.status(201).json(newTask);
    })
    .catch(next);
});

module.exports = router;
