
INSERT INTO departments (name)
VALUES
("Logistics"),
("Human Resources"),
("Operations");


INSERT INTO roles(title, salary,department_id)
VALUES
("Supply Chain Manager", 85000, 1),
("Warehouse Manager", 80000,1),
("Fork Truck Driver", 50000,1),
("HR Senior Lead", 110000,2),
("Secretary", 77000,2),
("Counselor", 80000,2),
("Operations Senior Engineer", 190000,3),
("Operations Mid Level Dev", 120000,3),
("Operations Intern", 40000,3);


INSERT INTO employees(first_name, last_name,role_id,manager_id)
VALUES
("Nick", "Fillip", 8, 7),
("Kevin", "Virgen", 7, null),
("Kyle", "Barton", 9, 8),
("Amanda", "Fillip", 4, null),
("Emily", "Fillip", 6, 4),
("Jane", "Doe", 5, 4),
("Connor", "Rodrigo", 1, null),
("Anna", "Rodrigo", 2, 1),
("Lulu", "The Pug", 3,1);