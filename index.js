//Install Inquirer package
const inquirer = require('inquirer');

// Import functions with my promisified query package
const dbIndex = require('./db/index');

//FUNCTION
//init
const init = async()=> {
    inquirer
        .prompt([
            {
            type: "rawlist",
            message: "What do you want to do?: ",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role","EXIT"],
            name: "action",
            }
        ])
        .then((data) => {
            switch(data.action) {
                case "view all departments":
                    dbIndex.viewDepartments(init);
                    break;
                case "view all roles":
                    dbIndex.viewRoles(init);
                    break;
                case "view all employees":
                    dbIndex.viewEmployees(init);
                    break;
                case "add a department":
                    dbIndex.addDepartment(init);
                    break;
                case "add a role":
                    dbIndex.addRole(init);
                    break;
                case "add an employee":    
                    dbIndex.addEmployee(init);
                    break
                case "update an employee role":
                    dbIndex.updateEmployeeRole(init);
                    break;
                case "EXIT":
                    process.exit();

            }
        })
}

//FUNCTION CALL
init();