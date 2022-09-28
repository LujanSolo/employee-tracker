const { prompt } = require("inquirer");
const db = require("./config/connection");
const cTable = require("console.table");

const init = () => {
  prompt([
    {
      type: "list",
      name: "task",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    },
  ]).then(({ task }) => {
    if (task == "View all departments") {
      db.promise()
        .query("SELECT * FROM department")
        .then((data) => {
          console.table(data[0]);
          init();
        });
    }

    if (task == "View all roles") {
      db.promise()
        .query("SELECT * FROM role")
        .then((data) => {
          console.table(data[0]);
          init();
        });
    }

    if (task == "View all employees") {
      db.promise()
        .query("SELECT * FROM employee")
        .then((data) => {
          console.table(data[0]);
          init();
        });
    }

    if (task == "Add a department") {
      prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the department you would like to add?",
        },
      ]).then((newDept) =>
        db.promise().query("INSERT INTO department SET ?", newDept).then(init)
      );
    }

    if (task == "Add a role") {
      prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "number",
          name: "salary",
          message: "What is the salary of this role?"
        },
        {
          type: "list",
          name: "department_id",
          message: "To which department does this role belong?",
          choices: [
            "1",
            "2",
            "3",
            "4"
          ],
        },
      ]).then((newRole) =>
        db.promise().query("INSERT INTO role SET ?", newRole).then(init)
      );
    }

    if (task == "Add an employee") {
      prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the department you would like to add?",
        },
      ]).then((newDept) =>
        db.promise().query("INSERT INTO department SET ?", newDept).then(init)
      );
    }

    if (task == "Update an employee role") {
      prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the department you would like to add?",
        },
      ]).then((newDept) => db.promise().query("INSERT INTO department SET ?", newDept).then(init)
      );
    }
  });
};

init();

