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
    message: 'Menu Options:',
    choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
  }
]).then(function(ans){
  switch(ans.options){
    case 'View Products for Sale':
      productSale();
      break;
    case 'View Low Inventory':
      lowInventory();
      break;
    case 'Add to Inventory':
      addInventory();
      break;
    case 'Add New Product':
      addProduct();
      break;
    default:
      console.log('Please select an option from the menu!');
  }
})

// ====================================================================================
function productSale(){
  connection.query('SELECT item_id, product_name, price, stock_quantity FROM products', function(error, row, field){
    if(error) throw error;
    console.log('----------------');
    console.log('AVAILABLE ITEMS');
    console.log('----------------');
    for(i=0; i<row.length; i++){
      console.log('Item Id:' + row[i].item_id+
                  '  Product Name: ' + row[i].product_name +
                  '  Price: $' + row[i].price +
                  '  Quantity: ' + row[i].stock_quantity);
    }
  });
};
// ====================================================================================

function lowInventory(){
  connection.query('SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5', function(error, row, field){
    if(error) throw error;
    console.log('--------------------------------');
    console.log('ITEMS THAT ARE LOW ON INVENTORY');
    console.log('--------------------------------');
    for(i=0; i<row.length; i++){
      console.log('Item Id:' + row[i].item_id+
                  '  Product Name: ' + row[i].product_name +
                  '  Price: $' + row[i].price +
                  '  Quantity: ' + row[i].stock_quantity);
    }
  });
};

// ====================================================================================
function addInventory(){
  console.log('ADD THE PRODUCT DETAILS:');

  var products = [];
  // connection.query('SELECT product_name FROM products', function(error, row, field){
  //   if(error) throw error;
  //   for(i=0; i<row.length; i++){
  //     row[i].push(products);
  //   }
  // })
  inquirer.prompt([
    // {
    //   type: 'list',
    //   name: 'pName',
    //   message: 'What is the product name?'
    //   choices: products;
    //
    // },
    {
      type: 'input',
      name: 'pName',
      message: 'What is the product name?'
    },
    {
      type: 'input',
      name: 'amount',
      message: 'How much inventory do you want add to this product?'
    },
  ]).then(function(ans){
    var pN = ans.pName;
    var a = ans.amount;

    connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_name = ? ', [a, pN], function(error, results, fields){
      if(error) throw error;
      console.log('-------------------------------------------');
      console.log('Inventory added to the product successfully');
      console.log('-------------------------------------------');
    })
  })
};


// ====================================================================================
function addProduct(){
  console.log('ADD THE PRODUCT DETAILS:');
  inquirer.prompt([
    {
      type: 'input',
      name: 'pName',
      message: 'What is the product name?'
    },
    {
      type: 'list',
      name: 'depName',
      message: 'What is the department the product belongs?',
      choices: ['Office', 'Dairy', 'Snacks']
    },
    {
      type: 'input',
      name: 'unitPrice',
      message: 'What is the price of the product?'
    },
    {
      type: 'input',
      name: 'stockQ',
      message: 'How much stock is in this product?'
    },
  ]).then(function(ans){
    var pN = ans.pName;
    var dN = ans.depName;
    var p = ans.unitPrice;
    var sQ = ans.stockQ;

    connection.query('INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)', [pN, dN, p, sQ], function(error, results, fields){
      if(error) throw error;
      console.log('---------------------------');
      console.log('Product added successfully');
      console.log('---------------------------');
    })
  })
};
// ====================================================================================
