//Require the mysql and inquirer packages.
var mysql = require("mysql");
var inquirer = require("inquirer");


//Create connection to the database.
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "1234",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayProducts();
});

function displayProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    //Log all results from the products table using the SELECT statement.
    console.log(res);
    connection.end();
  });
}

//#6 Prompt user asking them the ID of the product they would like to buy.
inquirer.prompt({
    type: "input",
    name: "itemID",
    message: "Please enter the item_ID number of the product you would like to purchase.",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      } 
      else {
        console.log("\nEnter only the item_id of the product!\n");
        return false;
      }
    }
  }, {
  //Prompt user asking how many units of the product they would like to buy.
    type: "input",
    name: "quantity",
    message: "How many units of the product would you like to purchase?",
    validate: function(value) {
      if (isNan(value) === false) {
        return true;
      }
      else {
        console.log("\nPlease enter a number less than or equal to the current quantity!\n");
      return false;
      }
    }
  })
  .then(function(answer) {
    var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?";
    connection.query(query, { itemID: answer.itemID }, function(err, res) {
      if (answer.itemID <= stock_quantity) {
        console.log("\n I'm sorry, that quantity is not available.\n");
        return true;
      }
      else {
        return false;
      }
    });
  });




//#7 
