//PACKAGE MODULES 
const util  =require('util')
const connection = require("./connection");
    //promisifying db.query
const query = util.promisify(connection.query).bind(connection)
const inquirer = require('inquirer');

//FUNCTIONS
//view departments
const viewDepartments = async (init) => {
    try {
        const output = await query(`SELECT * FROM departments;`);
        console.table(output)
        init();
    }catch (err){
        console.log(err)
    }
};

//view roles
const viewRoles = async (init) => {
    try {
        const output = await query(`SELECT roles.id as id , title, salary, name AS department FROM roles JOIN departments ON departments.id = roles.department_id `);
        console.table(output);
        init();
    }catch{
        console.log(err)
        
    }
}

//view employees
  const viewEmployees = async (init) => {
    try{
        const output = await query(`SELECT e1.id, e1.first_name, e1.last_name, roles.title, departments.name as department, roles.salary, CONCAT(e2.first_name," ", e2.last_name) as Manager
        FROM employees as e1 
        JOIN roles ON roles.id = e1.role_id 
        JOIN departments ON departments.id = roles.department_id
        LEFT JOIN employees as e2 ON e1.manager_id = e2.id`);
        console.table(output);       
        init();
    }catch{
        console.log(err)
    }    
  };

//get array of department items
const getDepartmentArray = async () => {
    try{
        const output = await query("SELECT id AS value, name FROM departments");
        return output;
    }catch (err)
    {
        console.log(err)
    }    
  
};

//get array of role items
const getRolesArray = async () => {
    try{
        const output = await query("SELECT id AS value, title as name FROM roles");
        return output;
    }catch (err)
    {
        console.log(err)
    }
}

//get array of employee items
const getEmployeeArray = async () => {
    try {
        const output = await query("SELECT id AS value, CONCAT(first_name,' ', last_name) as name FROM employees");
        return output;
    }
    catch (err) {
        console.log(err)
    }
}

//add a Department
const addDepartment = async (init) => {
    try{
        const data = await inquirer.prompt([
            {
            type: "input",
            message: "Please type new department name:  ",
            name: "newDepartment",
            }
        ])
        const output = await query(`INSERT INTO departments(name) VALUES (?)`,data.newDepartment);
        console.log("\033[102mDepartment added Successfully\033[0m")
        viewDepartments(init);
    }
    catch {
        console.log(err)
    }
}

//add a role
const addRole = async (init) => {
    try{
        const departmentArray = await getDepartmentArray();
        const data = await inquirer.prompt([
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
            choices: departmentArray,
            name: "department_id",
            }
        ])
        await query(`INSERT INTO roles(title, salary, department_id) VALUES ("${data.newRoleTitle}",${data.newRoleSalary},${data.department_id})`);
        console.log("\033[102mRole added Successfully\033[0m");
        viewRoles(init);
        
    }catch (err){
        console.log(err)
    }
 }

//add an employee
const addEmployee = async (init) => {
    try{
        const employeeArray = await getEmployeeArray();
        const rolesArray = await getRolesArray();
        const data = await inquirer.prompt([
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
            choices: rolesArray,
            name: "newEmployeeRole",
            },
            {
            type: "rawlist",
            message: "Please select the manager: ",
            choices: employeeArray,
            name: "newEmployeeManager",
            }
        ]);
        await query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${data.newEmployeeFirst}","${data.newEmployeeLast}",${data.newEmployeeRole}, ${data.newEmployeeManager})`);
        console.log("\033[102mEmployee added Successfully\033[0m");
        viewEmployees(init);
    }
    catch (err)
    {
        console.log(err)
    } 
};

//update employee role
const updateEmployeeRole = async (init) => {
    try{
        const employeeArray = await getEmployeeArray();
        const rolesArray = await getRolesArray();
        const data = await inquirer.prompt([
            {
            type: "rawlist",
            message: "Please select the employee you want to update: ",
            choices: employeeArray,
            name: "employeeName",
            },
            {
            type: "rawlist",
            message: "Please select the new role: ",
            choices: rolesArray,
            name: "updatedRole",
            }
        ])
        await query(`UPDATE employees SET role_id = "${data.updatedRole}" WHERE id = ${data.employeeName}`)
        console.log("\033[102mEmployee Role updated Successfully\033[0m")
        viewEmployees(init);
    }catch(err) {
        console.log(err)
    }
}

//EXPORTS
module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  getDepartmentArray,
  updateEmployeeRole
};
