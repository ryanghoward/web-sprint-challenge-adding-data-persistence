exports.up = async function (knex) {
  await knex.schema
    .createTable("projects", (table) => {
      table.increments("project_id");
      table.string("project_name", 100).notNullable();
      table.string("project_description", 100);
      table.integer("project_completed").defaultTo(0).unsigned();
      // table.boolean("project_completed").defaultTo(false);
    })
    .createTable("resources", (table) => {
      table.increments("resource_id");
      table.string("resource_name", 100).notNullable().unique();
      table.string("resource_description", 100);
    })
    .createTable("tasks", (table) => {
      table.increments("task_id");
      table.string("task_description", 100).notNullable();
      table.string("task_notes");
      table.integer("task_completed").defaultTo(0).unsigned();
      // table.boolean("task_completed").defaultTo(false);
      table
        .integer("project_id")
        .references("project_id")
        .inTable("projects")
        .unsigned()
        .notNullable()
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })
    .createTable("project_resources", (table) => {
      table.increments("project_resources_id");
      table.string("resource_assignment", 100);
      table
        .integer("resource_id")
        .notNullable()
        .references("resource_id")
        .inTable("resources")
        .unsigned()
        .notNullable()
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      table
        .integer("project_id")
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .unsigned()
        .notNullable()
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    });
};

exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
