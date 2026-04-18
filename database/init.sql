CREATE DATABASE IF NOT EXISTS ecommerce_db;

USE ecommerce_db;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image VARCHAR(500)
);

INSERT INTO products (name, price, description, image)
VALUES
(
    'iPhone 15',
    79999.00,
    'Latest Apple smartphone',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab'
),
(
    'Nike Shoes',
    4999.00,
    'Comfortable running shoes',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
),
(
    'Laptop Bag',
    1999.00,
    'Waterproof office bag',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa'
);