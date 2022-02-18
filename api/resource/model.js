// build your `Resource` model here
const db = require("../../data/dbConfig");

const getAll = () => {
  return db("resources");
};

// const create = async (resource) => {
//   const [id] = await db("resources").insert(resource);
//   return db("resources").where("resource_id", id).first();
// };

const create = (newTable) => {
  return db("resources")
    .insert(newTable)
    .then(([resource_id]) => {
      return db("resources").where("resource_id", resource_id).first();
    });
};

module.exports = {
  getAll,
  create,
};
