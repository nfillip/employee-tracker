//THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: "root",
        password: "root",
        database: "employeeTracker_db"
    }
)

class Company {
    constructor(subject) {
        this.subject = subject;
    }

    getTable(input) {
        const stringInput = `SELECT * FROM ${input};`;
        db.query(stringInput, function (err, results) {
            if (err) {
                console.log(error)
            } else {
                console.table(results)
            }
        })
        
    }
}

class Department extends Company {
    constructor(department) {
        super(department)
        this.department = department;
    }

    addDepartment() {
        console.log(this.department)
        db.query(`INSERT INTO departments(name) VALUES (?)`, this.department, (err,data) => {
            if(err){
                console.log(err)
            }else {
                console.log(`${this.department} added successfully to departments table`)
            }
        })
    }

}

class Role extends Company {
    constructor(title, salary, department) {
        super(department)
        this.title = title,
        this.salary = salary,
        this.department = department
    }

    addRole() {
        let idName;
        const string2 = `SELECT id from departments WHERE name = "${this.department}"`
        db.query(string2, (err, data) => {
            if (err){
                
                console.log(err)
            }else {
                idName = data[0].id
                const string1 = `INSERT INTO roles(title,salary,department_id) VALUES ("${this.title}", ${this.salary},${idName})`
                db.query(string1, (err,data) => {
                    if(err){
                        console.log("ERORRRRRRR")
                        console.log(err)
                    }else {
                        console.log(`Role added Successfully`)
                        
                    }
        })

            }
        })
        
        
    }

}
module.exports = {Company, Department,Role};