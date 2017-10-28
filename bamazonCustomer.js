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
    startPrompt();
  });
}

function startPrompt() {
  //#6 Prompt user asking them the ID of the product they would like to buy.
inquirer.prompt([
  {
    type: "input",
    name: "itemID",
    message: "Please enter the item ID number of the product you would like to purchase.",
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
      if (isNaN(value) === false) {
        return true;
      }
      else {
        console.log("\nPlease enter a number less than or equal to the current quantity!\n");
      return false;
      }
    }
  }])
  .then(function(answer) {
    var query = "SELECT * FROM products WHERE ?"
    connection.query(query, {item_id: answer.itemID}, function(err, res) {
      if (err) throw err;

      connection.query("SELECT * FROM products WHERE itemID = " + item_id, function(err, res) {
    if (err) throw err;

    //Log all results from the products table using the SELECT statement.
    console.log(err);

    if (quantity <= answer.itemID.stock_quantity) {
      var total = answer.itemID.price * quantity;
    console.log("\n Your order has been placed! \n");
    console.log("\n Your total is \n" + quantity + "" + answer.itemID.product_name + " is " + total);
    connection.query("UPDATE products SET stock_quantity = stock_quantity - " + value + "WHERE item_id");
    console.log(res.stock_quantity + item_id);

    process.exit()
  }
  else {
    console.log("\n Insufficient quantity! Please try again.\n")
    }
    process.exit()
  
  });

    });
  });
}

// function orderPlaced(itemID, quantity) {
//   connection.query("SELECT * FROM products WHERE itemID = " + item_id, function(err, res) {
//     if (err) throw err;

//     //Log all results from the products table using the SELECT statement.
//     console.log(err);

//     if (quantity <= answer.itemID.stock_quantity) {
//       var total = answer.itemID.price * quantity;
//     console.log("\n Your order has been placed! \n");
//     console.log("\n Your total is \n" + quantity + "" + answer.itemID.product_name + " is " + total);
//     connection.query("UPDATE products SET stock_quantity = stock_quantity - " + value + "WHERE item_id");
//     console.log(res.stock_quantity + item_id);

//     process.exit()
//   }
//   else {
//     console.log("\n Insufficient quantity! Please try again.\n")
//     }
//     process.exit()
  
//   });
// }
