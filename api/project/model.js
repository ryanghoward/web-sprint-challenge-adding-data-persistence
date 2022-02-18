// build your `Project` model here
const db = require("../../data/dbConfig");

const getAll = async () => {
  // const projects = await db("projects");
  // const results = [];

  // for (let i = 0; i < projects.length; i++) {
  //   let result = {
  //     project_id: projects[i].project_id,
  //     project_name: projects[i].project_name,
  //     project_description: projects[i].project_description,
  //     project_completed: projects[i].project_completed !== 0,
  //   };
  //   results.push(result);
  // }
  // return results;
  const projects = await db("projects");

  return projects.map((project) => {
    if (project.project_completed === 0) {
      return {
        project_id: project.project_id,
        project_name: project.project_name,
        project_description: project.project_description,
        project_completed: false,
      };
    } else {
      return {
        project_id: project.project_id,
        project_name: project.project_name,
        project_description: project.project_description,
        project_completed: true,
      };
    }
  });
};

const create = (newProject) => {
  return db("projects")
    .insert(newProject)
    .then(([project_id]) => {
      return db("projects").where("project_id", project_id).first();
    });
};

// const create = async (project) => {
//   const [id] = await db("projects").insert(project);
//   return db("projects").where("project_id", id).first();
// };

module.exports = {
  getAll,
  create,
};
