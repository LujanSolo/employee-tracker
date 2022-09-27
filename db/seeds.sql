INSERT INTO department (id, name)
VALUES  (1, "Engineering"),
        (2, "Finance"),
        (3, "Legal"),
        (4, "Sales");

INSERT INTO role (id, title, salary)
VALUES  (1, "Accountant", 125000),
        (2, "Account Manager", 160000),
        (3, "Lawyer", 190000),
        (4, "Legal Team Lead", 250000),
        (5, "Software Engineer", 120000);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Jamie", "Lujan", 5, null),
        (2, "Steven", "Barrios", 4, 3),
        (3, "Brandy", "Kolanko", 3),
        (4, "Mike", "Mack", 2, 2),
        (5, "Melissa", "Ortiz", 1);