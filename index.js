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
        .query("SELECT * FROM role")
        .then((data) => {
          console.table(data[0]);
          init();
        });
    }

    if (task == "View All Employees") {
      db.promise()
        .query("SELECT * FROM employee")
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

    if (task == "Add An Employee") {
      prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the employee's role?",
          choices: [
            "Accountant",
            "Graphic Artist",
            "Lawyer",
            "Legal Team Lead",
            "Software Engineer"
          ],
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is the employee's manager?",
          choices: [
            "Jamie Lujan",
            "Brandy Kolanko"
          ],
        },
      ]).then((newEmployee) =>
        db.promise().query("INSERT INTO employee SET ?", newEmployee).then(init)
      );
    }


    //* SET role_id = ?
    //* WHERE id = ?
    //* go to the EMPLOYEE TABLE, select the EMPLOYEE ID that user input after first question, then SET role_id to ROLE_ID CHOICES
    if (task == "Update An Employee Role") {
      prompt([
        {
          type: "list",
          name: "first_name",
          message: "Whose role do you want to update?",
          choices: [
            "Jamie",
            "Steven",
            "Brandy",
            "Mike",
            "Melissa"
          ],
        },
        {
          type: "list",
          name: "title",
          message: "Which role would you like to assign to the selected employee?", //*possible to {{employee}}? or something?
          choices: [
            "1",
            "2",
            "3",
            "4"
          ],
        },

      ]).then((updateRole) => db.promise().query("UPDATE role_id WHERE first_name ?", updateRole).then(init)
      );
    }
  });
};

init();

