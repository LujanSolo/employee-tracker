INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES  ("Accountant", 125000, 2),
        ("Manager", 160000, 2),
        ("Lawyer", 190000, 3),
        ("Legal Team Lead", 250000, 3),
        ("Software Engineer", 120000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jamie", "Lujan", 2, null),
        ("Steven", "Barrios", 4, 1),
        ("Brandy", "Kolanko", 3, 1),
        ("Mike", "Mack", 2),
        ("Melissa", "Ortiz", 1, 4);