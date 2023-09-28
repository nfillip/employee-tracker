//Install Inquirer package
const inquirer = require('inquirer');

// Import the model
const dbIndex = require('./db/index');

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

function addRole(roles, cb) {

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
        choices: roles,
        name: "department_id",
        }
    ]).then((data) => {
        const {newRoleTitle, newRoleSalary, department_id} = data;
        // dbIndex.addRole(newRoleTitle,newRoleSalary,newRoleDepartment);
        console.log(department_id)
        cb(newRoleTitle,newRoleSalary,department_id);
        
    })
}

// function addDepartment() {
//     inquirer.prompt([
//         {
//         type: "input",
//         message: "Please type new department name:  ",
//         name: "newDepartment",
//         }
//     ]).then((data) => {
//         console.log(`${data.newDepartment} - department added`)
//         // const department = new dbIndex.Department(data.newDepartment)
//         dbIndex.addDepartment(data.newDepartment);
        
//     })  
// }
init();