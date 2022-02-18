// build your `Task` model here
const db = require("../../data/dbConfig");

const getAll = async () => {
  // const tasks = await db("tasks as t")
  //   .join("projects as p", "t.project_id", "p.project_id")
  //   .select("t.*", "p.project_name", "p.project_description");

  // const results = [];

  // for (let i = 0; i < tasks.length; i++) {
  //   let result = {
  //     task_id: tasks[i].task_id,
  //     task_description: tasks[i].task_description,
  //     task_notes: tasks[i].task_notes,
  //     task_completed: tasks[i].task_completed !== 0,
  //     project_name: tasks[i].project_name,
  //     project_description: tasks[i].project_description,
  //   };
  //   results.push(result);
  // }
  // return results;
  const tasks = await db("tasks AS t")
    .leftJoin("projects as p", "p.project_id", "t.project_id")
    .select("t.*", "p.*");

  return tasks.map((task) => {
    if (task.task_completed === 0) {
      return {
        task_id: task.task_id,
        task_description: task.task_description,
        task_notes: task.task_notes,
        task_completed: false,
        project_name: task.project_name,
        project_description: task.project_description,
      };
    } else {
      return {
        task_id: task.task_id,
        task_description: task.task_description,
        task_notes: task.task_notes,
        task_completed: true,
        project_name: task.project_name,
        project_description: task.project_description,
      };
    }
  });
};

const create = async (newTask) => {
  // const [id] = await db("tasks").insert(task);
  // return db("tasks as t")
  //   .join("projects as p", "t.project_id", "p.project_id")
  //   .where("task_id", id)
  //   .select("t.*")
  //   .first();
  const taskId = await db("tasks").insert(newTask);
  const task = await db("tasks").where("task_id", taskId).first();

  if (task.task_completed === 0) {
    return {
      task_id: task.task_id,
      task_description: task.task_description,
      task_notes: task.task_notes,
      task_completed: false,
      project_id: task.project_id,
    };
  } else {
    return {
      task_id: task.task_id,
      task_description: task.task_description,
      task_notes: task.task_notes,
      task_completed: true,
      project_id: task.project_id,
    };
  }
};

module.exports = {
  getAll,
  create,
};
