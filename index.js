//Install Inquirer package
const inquirer = require('inquirer');

// Import the model
const dbIndex = require('./db/index');
// const mysql = require('mysql2');
// require('dotenv').config();

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: "root",
//         password: "root",
//         database: "employeeTracker_db"
//     }
// )
// db.query("SELECT * FROM departments", (err, results) => {
//     if (err) {
//         console.log(err)
//     }else {
//         console.log(results)
//     }
// })
function init() {
    inquirer
        .prompt([
            {
            type: "rawlist",
            message: "What do you want to do?: ",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
            name: "action",
            }
        ])
        .then((data) => {
            switch(data.action) {
                case "view all departments":
                case "view all roles":
                case "view all employees":
                    let temp = data.action.split(" ");
                    const company = new dbIndex.Company(temp[2])
                    company.getTable(temp[2]);
                    break;
                case "add a department":
                    inquirer.prompt([
                        {
                        type: "input",
                        message: "Please type new department name:  ",
                        name: "newDepartment",
                        }
                    ]).then((data) => {
                        console.log(`${data.newDepartment} - department added`)
                        const department = new dbIndex.Department(data.newDepartment)
                        department.addDepartment(data.newDepartment);
                        department.getTable("departments")
                        
                        //TO DO: Call a function to add a department to departments table
                    })  
                    break;
                case "add a role":

                    inquirer.prompt([
                        {
                        type: "input",
                        message: "Please enter Title of role:  ",
                        name: "newRoleTitle",
                        },
                        {
                        type: "input",
                        message: "Please enter role's salary:  ",
                        name: "newRoleSalary",
                        },
                        {
                        type: "rawlist",
                        message: "Please enter what Department this role is in: ",
                        choices: ["Operations", "Logistics", "Human Resources"],
                        name: "newRoleDepartment",
                        }
                    ]).then((data) => {
                        console.log(data)
                        const {newRoleTitle, newRoleSalary, newRoleDepartment} = data;
                        const role = new dbIndex.Role(newRoleTitle, newRoleSalary, newRoleDepartment);
                        role.addRole();
                        

                        //TO DO: call function to add a role with these values
                    })
                    break;
                case "add an employee":    
                    console.log("adding an employee")
                    break;
                case "update an employee role":
                    console.log("updating an employee")
                    break;
                
            }
            
            
        })
}

init();