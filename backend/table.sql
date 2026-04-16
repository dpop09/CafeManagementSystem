CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250),
    contactNumber VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(250),
    status VARCHAR(20),
    role VARCHAR(20),
    UNIQUE (email)
);

INSERT INTO user(name, contactNumber, email, password, status, role)
VALUES('Admin', '123123123', 'admin@gmail.com', 'admin', 'true', 'admin');

INSERT INTO user(name, contactNumber, email, password, status, role)
VALUES('John Smith', '(123)123-1234', 'jsmith@gmail.com', '123456', 'false', 'user');

CREATE TABLE category(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE product(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    categoryId INT NOT NULL,
    description VARCHAR(255),
    price FLOAT,
    status VARCHAR(20),
    PRIMARY KEY(id)
);

CREATE TABLE bill(
    id INT NOT NULL AUTO_INCREMENT,
    uuid VARCHAR(200) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contactNumber VARCHAR(20) NOT NULL,
    paymentMethod VARCHAR(50) NOT NULL,
    total FLOAT NOT NULL,
    productDetails JSON DEFAULT NULL,
    createdBy VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);