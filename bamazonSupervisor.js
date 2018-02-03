var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bamazon'
});

console.log("Welcome!");
console.log('__________');
inquirer.prompt([
  {
    type: 'list',
    name: 'options',
    message: 'Menu Options for the Supervisor:',
    choices: ['View Products Sales by Department', 'Create New Department']
  }
]).then(function(ans){
  switch(ans.options){
    case 'View Products Sales by Department':
      viewProductSales();
      break;
    case 'Create New Department':
      createDept();
      break;
    default:
      console.log('Please select an option from the menu!');
  }
})

// ====================================================================================
function viewProductSales(){
  connection.query('SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales FROM departments LEFT JOIN products ON departments.department_name = products.department_name', function(error, row, field){
    if(error) throw error;
    console.log('-------------------------------');
    console.log('ALL PRODUCT SALES BY DEPARTMENT');
    console.log('-------------------------------');

    for(i=0; i<row.length; i++){
      console.log('departments_id:' + row[i].department_id+
                  '  department_name: ' + row[i].department_name +
                  '  over_head_costs: $' + row[i].over_head_costs +
                  '  product_sales: ' + row[i].product_sales +
                  '  total_profit: $' + (row[i].product_sales - row[i].over_head_costs));
    }
  });
};

// ====================================================================================

function createDept(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'dName',
      message: 'What is the name of the department you want to add?'
    },
    {
      type: 'input',
      name: 'overHead',
      message: 'How much over head costs does this department have?'
    },
  ]).then(function(ans){
    var dN = ans.dName;
    var oH = ans.overHead;

    connection.query('INSERT INTO departments(department_name, over_head_costs) VALUES (?, ?) ', [dN, oH], function(error, results, fields){
      if(error) throw error;
      console.log('----------------------------------------------------------');
      console.log('New department added to the departments table successfully');
      console.log('----------------------------------------------------------');
    })
  })
};
