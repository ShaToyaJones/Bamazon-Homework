DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 650.00, 3), ("all in one computer", "electronics", 1920.00, 9), ("cell phone", "electronics", 920.00, 53), ("tuna", "grocery", 1.57, 999 ), ("black beans", "grocery", .99, 333), ("corn bread", "grocery", 2.59, 137), ("guitar", "music instruments", 249.99, 29), ("drums", "music instruments", 349.99, 9), ("piano", "music instruments", 23999.00, 3) ("microphone", "music instruments", 99.00, 24);