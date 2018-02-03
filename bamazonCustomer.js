var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bamazon'
});

connection.connect();

inquirer.prompt([
  {
    type: 'input',
    name: 'id',
    message: 'Enter the Item ID of the product you would like to buy?',
    // validate: validateNum(id)
    //         {
    //          var isValid = !_.isNaN(parseInt(id));
    //          return isValid || "id should be a number!";
    //         }
  },
  {
    type: 'input',
    name: 'quantity',
    message: 'How many units?'
  }
]).then(function(ans){
  console.log('id: '+ ans.id);
  console.log('quan ' + ans.quantity);
  // showInventory();
  checkOrder(ans.id, ans.quantity)
});


// function showInventory(){
//   connection.query('SELECT item_id, product_name, department_name, price, stock_quantity FROM products', function(error, results, fields){
//     if(error) throw error;
//     console.log('The entire products table ', results);
//     console.log('=====================================');
//     for(var i=0; i<results.length; i++){
//       console.log('Item Id: '+ results[i].item_id + ' Product Name: ' + results[i].product_name + 'Dept Name: '+ results[i].department_name + '   Price: $' + results[i].price + 'Stock Quan: '+ results[i].stock_quantity);
//     }
//   })
//
// }

function checkOrder(id, quantity){
  connection.query('SELECT stock_quantity, price, product_name, item_id, product_sales FROM products WHERE item_id = ?', [id], function(error, results, fields){
    if(error) throw error;

    if(results[0].stock_quantity >= quantity){
      //+++++++++++++++++
      //GETTING THE COST
      console.log('Price: '+ JSON.parse(results[0].price));
      var unitPrice = JSON.parse(results[0].price);
      var cost = quantity * JSON.parse(results[0].price);
      console.log("Your total cost to order " + results[0].product_name + '(Id No: ' + results[0].item_id  + ') will be: $' + cost  );

      //+++++++++++++++++
      //UPDATING THE TABLE FOR QUANTITY CHANGE
      console.log('_________________________');
      var newQuantity = JSON.parse(results[0].stock_quantity) - quantity;
      console.log(newQuantity);
      connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newQuantity, id], function(error, results, fields){
        if(error) throw error;
        // connection.end();
      })

      //+++++++++++++++++
      //UPDATING THE products table FOR product sales CHANGE
      connection.query('UPDATE products SET product_sales = ? WHERE item_id = ?', [cost, id], function(error, results, fields){
        if(error) throw error;
        connection.end();
      })


  }else{
    console.log('Insufficient quanity!');
  }

  })
}
