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
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee Role",
      ],
    },
  ]).then(({ task }) => {
    if (task == "View All Departments") {
      db.promise()
        .query("SELECT * FROM department")
        .then((data) => {
          console.table(data[0]);
          init();
        });
    }

    if (task == "View All Roles") {
      db.promise()
        .query(
          "SELECT role.id, role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id"
        )
        .then((data) => {
          console.table(data[0]);
          init();
        });
    }

    if (task == "View All Employees") {
      db.promise()
        .query(
          "SELECT employee.id, employee.first_name, employee.last_name, role.title, concat(manager_table.first_name,' ', manager_table.last_name) Manager FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN employee manager_table ON manager_table.id = employee.manager_id"
        )
        .then((data) => {
          console.table(data[0]);
          init();
        });
    }

    if (task == "Add A Department") {
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

    if (task == "Add A Role") {
      db.query("SELECT name, id value FROM department", (err, data) => {
        prompt([
          {
            type: "input",
            name: "title",
            message: "What is the name of the role?",
          },
          {
            type: "number",
            name: "salary",
            message: "What is the salary of this role?",
          },
          {
            type: "list",
            name: "department_id",
            message: "To which department does this role belong?",
            choices: data,
          },
        ]).then((newRole) =>
          db.promise().query("INSERT INTO role SET ?", newRole).then(init)
        );
      });
    }

    if (task == "Add An Employee") {
      db.query("SELECT title name, id value FROM role", (err, data) => {
        db.query(
          "SELECT concat(first_name,' ', last_name) name, id value FROM employee",
          (err, empData) => {
            prompt([
              {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?",
              },
              {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?",
              },
              {
                type: "list",
                name: "role_id",
                message: "What is the employee's role?",
                choices: data,
              },
              {
                type: "list",
                name: "manager_id",
                message: "Who is the employee's manager?",
                choices: empData,
              },
            ]).then((newEmployee) =>
              db
                .promise()
                .query("INSERT INTO employee SET ?", newEmployee)
                .then(init)
            );
          }
        );
      });
    }

    if (task == "Update An Employee Role") {
      db.query(
        "SELECT concat(first_name,' ', last_name) name, id value FROM employee",
        (err, empData) => {
          db.query(
            "SELECT title name, id value FROM role",
            (err, updatedRole) => {
              prompt([
                {
                  type: "list",
                  name: "first_name",
                  message: "Whose role do you want to update?",
                  choices: empData,
                },
                {
                  type: "list",
                  name: "title",
                  message:
                    "Which role would you like to assign to the selected employee?",
                  choices: updatedRole,
                },
              ]).then((updatedRole) => {
                db.query(
                  "UPDATE employee SET role_id = ? WHERE id = ?",
                  [updatedRole.title, updatedRole.first_name],
                  (err, data) => {
                    init();
                  }
                );
              });
            }
          );
        }
      );
    }
  });
};

init();
