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
const init = async()=> {
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
                    dbIndex.viewDepartments();
                case "view all roles":
                    dbIndex.viewRoles();
                case "view all employees":
                    dbIndex.viewEmployees(temp[2])
                    // const company = new dbIndex.Company(temp[2])
                    // company.getTable(temp[2]);
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
                        // const department = new dbIndex.Department(data.newDepartment)
                        dbIndex.addDepartment(data.newDepartment);
                        
                        
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
                        choices: ["Operations","Human Resources", "Logistics"],
                        name: "newRoleDepartment",
                        }
                    ]).then((data) => {
                        // console.log(data)
                        const {newRoleTitle, newRoleSalary, newRoleDepartment} = data;
                        // const role = new dbIndex.Role(newRoleTitle, newRoleSalary, newRoleDepartment);
                        dbIndex.addRole(newRoleTitle,newRoleSalary,newRoleDepartment);
                        // role.addRole();
                        

                        //TO DO: call function to add a role with these values
                    })
                    break;
                case "add an employee":    
                inquirer.prompt([
                    {
                    type: "input",
                    message: "First Name:  ",
                    name: "newEmployeeFirst",
                    },
                    {
                    type: "input",
                    message: "Last Name:  ",
                    name: "newEmployeeLast",
                    },
                    {
                    type: "rawlist",
                    message: "Please select the role: ",
                    choices: ["Supply Chain Manager","Warehouse Manager","Fork Truck Driver","HR Senior Lead","Secretary","Counciler","Operations Senior Engineer","Operations Mid Level Dev","Operations Intern"],
                    name: "newEmployeeRole",
                    },
                    {
                    type: "rawlist",
                    message: "Please select the manager: ",
                    choices: ["Nick", "Kevin", "Kyle", "Amanda"],
                    name: "newEmployeeManager",
                    }
                ]).then((data) => {
                    console.log(data)
                    const {newEmployeeFirst, newEmployeeLast, newEmployeeRole, newEmployeeManager} = data;
                    dbIndex.addEmployee(newEmployeeFirst, newEmployeeLast, newEmployeeRole, newEmployeeManager);
                    
                    

                    //TO DO: call function to add a role with these values
                })
                    break;
                case "update an employee role":
                    inquirer.prompt([
                        {
                        type: "rawlist",
                        message: "Please select the employee: ",
                        choices: ["Nick", "Kevin", "Kyle", "Amanda", "Emily","Jane"],
                        name: "employeeName",
                        },
                        {
                        type: "rawlist",
                        message: "Please select the role: ",
                        choices: ["Supply Chain Manager","Warehouse Manager","Fork Truck Driver","HR Senior Lead","Secretary","Counciler","Operations Senior Engineer","Operations Mid Level Dev","Operations Intern"],
                        name: "updatedRole",
                        }
                        
                    ]).then((data) => {
                        const {employeeName, updatedRole} = data;
                        dbIndex.updateEmployeeRole(employeeName, updatedRole);
                        
                        
    
                        //TO DO: call function to add a role with these values
                    })
                    break;
                
            }
            
            
        })
}

init();