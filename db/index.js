//THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const util  =require('util')
const connection = require("./connection");
const query = util.promisify(connection.query).bind(connection)
const mysql = require("mysql2");
const inquirer = require('inquirer');
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employeeTracker_db",
});

const viewDepartments = async (init) => {
    try {
        const output = await query(`SELECT * FROM departments;`);
        console.table(output)
        
        init();
    }catch (err){
        console.log(err)
    }
   
  
  
};

const viewRoles = async (init) => {
    try {
        const output = await query(`SELECT roles.id as id , title, salary, name AS department FROM roles JOIN departments ON departments.id = roles.department_id `);
        console.table(output);
        
        init();
    }catch{
        console.log(err)
        
    }
}

   

  const viewEmployees = async (init) => {

    try{
        const output = await query(`SELECT * FROM employees`);
        console.table(output);
        
        init();
    }catch{
        console.log(err)
    }
    
  };

const getDepartmentArray = async () => {
    try{
        const output = await query("SELECT id AS value, name FROM departments");
        return output;
    }catch (err)
    {
        console.log(err)
    }    
  
};

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
        console.log("Department added Successfully")
        init();
    }
    catch {
        console.log(err)
    }
}

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
            choices: roles,
            name: "department_id",
            }
        ])
        const output = await 
        
    }catch (err){
        console.log(err)
    }
 }

// const addRole = async (init) => {
//   let idName;
//   const string2 = `SELECT id from departments WHERE name = "${department}"`;
//   db.query(string2, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//         console.log(data)
//       idName = data[0].id;
//       const string1 = `INSERT INTO roles(title,salary,department_id) VALUES ("${title}", ${salary},${idName})`;
//       db.query(string1, (err, data) => {
//         if (err) {
//           console.log("ERORRRRRRR");
//           console.log(err);
//         } else {
//           console.log(`Role added Successfully`);
//           viewRoles();
//         }
//       });
//     }
//   });
// };

const addEmployee = async (first_name, last_name, role, manager) => {
  let roleId;
  let managerId;
  const string1 = `SELECT id from roles WHERE title = "${role}"`;
  db.query(string1, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      roleId = data[0].id;
      const string2 = `SELECT id from employees WHERE first_name = "${manager}"`;
      db.query(string2, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          managerId = data[0].id;
          const string3 = `INSERT INTO employees(first_name,last_name,role_id,manager_id) VALUES ("${first_name}", "${last_name}",${roleId}, ${managerId})`;
          db.query(string3, (err, data) => {
            if (err) {
              console.log("ERORRRRRRR");
              console.log(err);
            } else {
              console.log(`Employee added Successfully`);
              viewEmployees();
            }
          });
        }
      });
    }
  });
};

const updateEmployeeRole = async (firstName, updatedRole) => {
    let nameId;
    let roleId;
    db.query(`SELECT id from employees WHERE first_name = "${firstName}"`, (err,data) => {
        if (err) {
            console.log(err);
        } else {
            nameId = data[0].id
            db.query(`SELECT id from roles WHERE title = "${updatedRole}"`, (err, data) => {
                if (err) {
                console.log(err);
                } else {
                roleId = data[0].id;
                 db.query(`UPDATE employees SET role_id = "${roleId}" WHERE id = ${nameId}`, (err,data) => {
                    if (err) {
                        console.log(err)
                    }else {
                         console.log("Employee Role Updated Successfully")
                         viewEmployees()
                    }
                   
                 });
                
                }
            })    
        }
    })
    
}
// class Company {
//     constructor(subject) {
//         this.subject = subject;
//     }

//     // getTable(input) {
//     //     const stringInput = `SELECT * FROM ${input};`;
//     //     db.query(stringInput, function (err, results) {
//     //         if (err) {
//     //             console.log(error)
//     //         } else {
//     //             console.table(results)
//     //         }
//     //     })

//     // }

//     getEmployeeList(){
//         db.query("SELECT * FROM employees")
//     }
// }

// // class Department extends Company {
// //     constructor(department) {
// //         super(department)
// //         this.department = department;
// //     }

// //     addDepartment() {
// //         console.log(this.department)
// //         db.query(`INSERT INTO departments(name) VALUES (?)`, this.department, (err,data) => {
// //             if(err){
// //                 console.log(err)
// //             }else {
// //                 console.log(`${this.department} added successfully to departments table`)
// //             }
// //         })
// //     }

// // }

// class Role extends Company {
//     constructor(title, salary, department) {
//         super(department)
//         this.title = title,
//         this.salary = salary,
//         this.department = department
//     }

//     addRole() {
//         let idName;
//         const string2 = `SELECT id from departments WHERE name = "${this.department}"`
//         db.query(string2, (err, data) => {
//             if (err){

//                 console.log(err)
//             }else {
//                 idName = data[0].id
//                 const string1 = `INSERT INTO roles(title,salary,department_id) VALUES ("${this.title}", ${this.salary},${idName})`
//                 db.query(string1, (err,data) => {
//                     if(err){
//                         console.log("ERORRRRRRR")
//                         console.log(err)
//                     }else {
//                         console.log(`Role added Successfully`)

//                     }
//         })

//             }
//         })

//     }

// }

// class Employee extends Company {
//     constructor(title, salary, department) {
//         super(department)
//         this.title = title,
//         this.salary = salary,
//         this.department = department
//     }

//     addRole() {
//         let idName;
//         const string2 = `SELECT id from departments WHERE name = "${this.department}"`
//         db.query(string2, (err, data) => {
//             if (err){

//                 console.log(err)
//             }else {
//                 idName = data[0].id
//                 const string1 = `INSERT INTO roles(title,salary,department_id) VALUES ("${this.title}", ${this.salary},${idName})`
//                 db.query(string1, (err,data) => {
//                     if(err){
//                         console.log("ERORRRRRRR")
//                         console.log(err)
//                     }else {
//                         console.log(`Role added Successfully`)

//                     }
//         })

//             }
//         })

//     }

// }

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
