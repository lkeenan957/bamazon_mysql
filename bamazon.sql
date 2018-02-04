DROP DATABASE ID EXISTS bamazon;

USE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(3,2) NOT NULL,
  stock_quantity INT NOT NULL
);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL,
  over_head_costs INT NOT NULL
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Binder", "Office", 2.30, 30),
		    ("Pencil", "Office", 1.00, 25),
        ("Pen", "Office", 0.50, 50),
        ("Chocolate Milk", "Dairy", 3.99, 20),
        ("Riccotta", "Dairy", 2.99, 15),
        ("Biscuit", "Snacks", 5.99, 100),
        ("Chocolate", "Snacks", 4.99, 105),
        ("Chedder Cheese", "Dairy", 2.00, 30),
        ("Whole Milk", "Dairy", 2.29, 35),
        ("Marker", "Office", 0.99, 47)
        ("Toffee", "Snacks", 0.50, 4)
        ("Envelopes", "Office", 1.00, 5);

ALTER TABLE products ADD COLUMN product_sales DECIMAL(4,2);

INSERT INTO departments(department_name, over_head_costs)
VALUES ('Office', 30),
        ('Diary', 40),
        ('Snacks', 50);

DELETE FROM departments WHERE department_id >= 0
