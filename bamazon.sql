DROP DATABASE ID EXISTS bamazon;

USE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id int not NULL AUtO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(3,2) NOT NULL,
  stock_quantity INT NOT NULL
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
        ("Marker", "Office", 0.99, 47);

  mysql> select * from products;
  +---------+----------------+-----------------+-------+----------------+
  | item_id | product_name   | department_name | price | stock_quantity |
  +---------+----------------+-----------------+-------+----------------+
  |       1 | Binder         | Office          |  2.30 |             30 |
  |       2 | Pencil         | Office          |  1.00 |             25 |
  |       3 | Pen            | Office          |  0.50 |             50 |
  |       4 | Chocolate Milk | Dairy           |  3.99 |             20 |
  |       5 | Riccotta       | Dairy           |  2.99 |             15 |
  |       6 | Biscuit        | Snacks          |  5.99 |            100 |
  |       7 | Chocolate      | Snacks          |  4.99 |            105 |
  |       8 | Chedder Cheese | Dairy           |  2.00 |             30 |
  |       9 | Whole Milk     | Dairy           |  2.29 |             35 |
  |      10 | Marker         | Office          |  0.99 |             47 |
  +---------+----------------+-----------------+-------+----------------+
  10 rows in set (0.02 sec)
