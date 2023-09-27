DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE departments(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT NULL, 
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

CREATE TABLE employees(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL, 
    manager_id INT REFERENCES employees(id)
);
