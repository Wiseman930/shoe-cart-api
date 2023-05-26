CREATE TABLE register (
    id SERIAL NOT NULL PRIMARY KEY,
    email TEXT NOT NULL,
    password VARCHAR(10) NOT NULL
);

CREATE TABLE brands (
    id SERIAL NOT NULL PRIMARY KEY,
    brand TEXT NOT NULL
);

CREATE TABLE stockimages (
    id SERIAL NOT NULL PRIMARY KEY,
    image TEXT NOT NULL
);

CREATE TABLE sizes (
    id SERIAL NOT NULL PRIMARY KEY,
    size TEXT NOT NULL
);

CREATE TABLE colors (
    id SERIAL NOT NULL PRIMARY KEY,
    brand_id INT NOT NULL REFERENCES brands(id),
    color TEXT NOT NULL
);

CREATE TABLE names (
    id SERIAL NOT NULL PRIMARY KEY,
    brand_id INT NOT NULL REFERENCES brands(id),
    shoe_name TEXT NOT NULL
);

CREATE TABLE stock (
    id SERIAL NOT NULL PRIMARY KEY,
    brand_id INT NOT NULL REFERENCES brands(id),
    color_id INT NOT NULL REFERENCES colors(id),
    names_id INT NOT NULL REFERENCES names(id),
    size_id INT NOT NULL REFERENCES sizes(id),
    price INT NOT NULL,
    quantity INT NOT NULL,
    image_id INT NOT NULL REFERENCES stockimages(id)
);

CREATE TABLE cart (
    id SERIAL NOT NULL PRIMARY KEY,
    brand INT NOT NULL,
    color INT NOT NULL,
    size INT NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL,
    stock_id INT NOT NULL REFERENCES stock(id),
    register_id INT NOT NULL REFERENCES register(id),
    cart_image INT NOT NULL
);



CREATE TABLE shipping (
  id SERIAL NOT NULL PRIMARY KEY,
  register_id INT NOT NULL REFERENCES register(id),
  shipping_full_name TEXT NOT NULL,
  shipping_country TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_province TEXT NOT NULL,
  shipping_zipcode TEXT NOT NULL,
  shipping_phone_number VARCHAR(10) NOT NULL,
  shipping_cost INT NOT NULL
);

CREATE TABLE ship_provinces (
  province_name VARCHAR(255) NOT NULL,
  shipping_cost VARCHAR(10) NOT NULL
);

INSERT INTO ship_provinces (province_name, shipping_cost) VALUES
('Eastern Cape', 10),
('Free State', 15),
('Gauteng', 20),
('KwaZulu-Natal', 25),
('Limpopo', 30),
('Mpumalanga', 35),
('North West', 40),
('Northern Cape', 45),
('Western Cape', 50);



/*Afani images*/
insert into stockimages (id, image) values
 (1, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Afani/Black.JPG?raw=true'),
 (2, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Afani/Grey.JPG?raw=true'),
 (3, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Afani/Navy.JPG?raw=true'),
 (4, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Afani/White.JPG?raw=true'),

/*Bellito images*/
 (5, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Bellito/Green-Top.jpg?raw=true'),
 (6, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Bellito/Green.jpg?raw=true'),
 (7, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Bellito/White%20boots.jpg?raw=true'),
 (8, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Bellito/White.jpg?raw=true'),

/*Seruto images*/
 (9, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Seruto/Light-Blue.JPG?raw=true'),
 (10, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Seruto/Light-Green.JPG?raw=true'),
 (11, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Seruto/Red.JPG?raw=true'),
 (12, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Seruto/Yellow.JPG?raw=true'),

/*Tago images*/
 (13, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Tago/black.jpg?raw=true'),
 (14, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Tago/brown.jpg?raw=true'),
 (15, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Tago/white.jpg?raw=true'),

/*Zing images*/
 (16, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Zing/Black-Green.jpg?raw=true'),
 (17, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Zing/Black-White.jpg?raw=true'),
 (18, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Zing/Green.jpg?raw=true'),
 (19, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Zing/White.jpg?raw=true');

/*Shoe sizes*/
insert into sizes (id, size) values
(1, 5),
(2, 6),
(3, 7),
(4, 8),
(5, 9);

/*All brands*/
insert into brands (id, brand) values
 (1, 'Afani'),
 (2, 'Bellito'),
 (3, 'Seruto'),
 (4, 'Tago'),
 (5, 'Zing')


/*all brand colors*/
/*Afani colors*/
insert into colors (id, brand_id, color) values 
 (1, 1, 'Black'),
 (2, 1, 'Grey'),
 (3, 1, 'Navy'),
 (4, 1, 'White'),

/*Bellito colors*/
 (5, 2, 'Green'),
 (6, 2, 'White'),

/*Seruto images*/
 (7, 3, 'Light-Blue'),
 (8, 3, 'Light-Green'),
 (9, 3, 'Red'),
 (10, 3, 'Yellow'),

/*Tago*/
 (11, 4, 'Black'),
 (12, 4, 'Brown'),
 (13, 4, 'White'),

/*Zing*/
 (14, 5, 'Black-Green'),
 (15, 5, 'Black-White'),
 (16, 5, 'Green'),
 (17, 5, 'White');



INSERT INTO names (id, brand_id, shoe_name)
VALUES (1, 1, 'Oxion'),
       (2, 1, 'High x'),
       (3, 2, 'T brass'),
       (4, 2, 'Wild R5s'),
       (5, 3, 'Cool 6'),
       (6, 4, 'Mac g'),
       (7, 4, 'Flat t'),
       (8, 4, 'Superfly'),
       (9, 5, 'Aqua flex'),
       (10, 5, 'Zenlife');




/*AFANI STOCK ITEMS*/
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (1, 1, 1, 1, 1, 700, 45, 1),
(2, 1, 1, 1, 2, 700, 45, 1),
(3, 1, 1, 1, 3, 700, 45, 1),
(4, 1, 1, 1, 4, 700, 45, 1),
(5, 1, 1, 1, 5, 700, 45, 1),


(6, 1, 4, 1, 1, 700, 45, 4),
(7, 1, 4, 1, 2, 700, 45, 4),
(8, 1, 4, 1, 3, 700, 45, 4),
(9, 1, 4, 1, 4, 700, 45, 4),
(10, 1, 4, 1, 5, 700, 45, 4),


(11, 1, 3, 2, 1, 740, 45, 3),
(12, 1, 3, 2, 2, 740, 45, 3),
(13, 1, 3, 2, 3, 740, 45, 3),
(14, 1, 3, 2, 4, 740, 45, 3),
(15, 1, 3, 2, 5, 740, 45, 3),


(16, 1, 2, 2, 1, 740, 45, 2),
(17, 1, 2, 2, 2, 740, 45, 2),
(18, 1, 2, 2, 3, 740, 45, 2),
(19, 1, 2, 2, 4, 740, 45, 2),
(20, 1, 2, 2, 5, 740, 45, 2);




/*BELLITO STOCK ITEMS BOOTS*/
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (21, 2, 5, 3, 1, 850, 45, 5),
(22, 2, 5, 3, 2, 850, 45, 5),
(23, 2, 5, 3, 3, 850, 45, 5),
(24, 2, 5, 3, 4, 850, 45, 5),
(25, 2, 5, 3, 5, 850, 45, 5),

(26, 2, 6, 3, 1, 850, 45, 7),
(27, 2, 6, 3, 2, 850, 45, 7),
(28, 2, 6, 3, 3, 850, 45, 7),
(29, 2, 6, 3, 4, 850, 45, 7),
(30, 2, 6, 3, 5, 850, 45, 7),


(31, 2, 5, 4, 1, 900, 45, 6),
(32, 2, 5, 4, 2, 900, 45, 6),
(33, 2, 5, 4, 3, 900, 45, 6),
(34, 2, 5, 4, 4, 900, 45, 6),
(35, 2, 5, 4, 5, 900, 45, 6),

(36, 2, 6, 4, 1, 970, 45, 8),
(37, 2, 6, 4, 2, 970, 45, 8),
(38, 2, 6, 4, 3, 970, 45, 8),
(39, 2, 6, 4, 4, 970, 45, 8),
(40, 2, 6, 4, 5, 970, 45, 8);




/*SERUTO STOCK ITEMS*/
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (41, 3, 7, 5, 1, 300, 45, 9),
(42, 3, 7, 5, 2, 300, 45, 9),
(43, 3, 7, 5, 3, 300, 45, 9),
(44, 3, 7, 5, 4, 300, 45, 9),
(45, 3, 7, 5, 5, 300, 45, 9),

(46, 3, 8, 5, 1, 300, 45, 10),
(47, 3, 8, 5, 2, 300, 45, 10),
(48, 3, 8, 5, 3, 300, 45, 10),
(49, 3, 8, 5, 4, 300, 45, 10),
(50, 3, 8, 5, 5, 300, 45, 10),

(51, 3, 9, 5, 1, 300, 45, 11),
(52, 3, 9, 5, 2, 300, 45, 11),
(53, 3, 9, 5, 3, 300, 45, 11),
(54, 3, 9, 5, 4, 300, 45, 11),
(55, 3, 9, 5, 5, 300, 45, 11),

(56, 3, 10, 5, 1, 300, 45, 12),
(57, 3, 10, 5, 2, 300, 45, 12),
(58, 3, 10, 5, 3, 300, 45, 12),
(59, 3, 10, 5, 4, 300, 45, 12),
(60, 3, 10, 5, 5, 300, 45, 12);



/*TAGO STOCK ITEMS*/
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (61, 4, 11, 6, 1, 1200, 45, 13),
(62, 4, 11, 6, 2, 1200, 45, 13),
(63, 4, 11, 6, 3, 1200, 45, 13),
(64, 4, 11, 6, 4, 1200, 45, 13),
(65, 4, 11, 6, 5, 1200, 45, 13),

(66, 4, 12, 7, 1, 1300, 45, 14),
(67, 4, 12, 7, 2, 1300, 45, 14),
(68, 4, 12, 7, 3, 1300, 45, 14),
(69, 4, 12, 7, 4, 1300, 45, 14),
(70, 4, 12, 7, 5, 1300, 45, 14),

(71, 4, 13, 8, 1, 2000, 45, 15),
(72, 4, 13, 8, 2, 2000, 45, 15),
(73, 4, 13, 8, 3, 2000, 45, 15),
(74, 4, 13, 8, 4, 2000, 45, 15),
(75, 4, 13, 8, 5, 2000, 45, 15);




/*ZING STOCK ITEMS*/
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (76, 5, 14, 9, 1, 570, 45, 16),
(77, 5, 14, 9, 2, 570, 45, 16),
(78, 5, 14, 9, 3, 570, 45, 16),
(79, 5, 14, 9, 4, 570, 45, 16),
(80, 5, 14, 9, 5, 570, 45, 16),

(81, 5, 15, 9, 1, 540, 45, 17),
(82, 5, 15, 9, 2, 540, 45, 17),
(83, 5, 15, 9, 3, 540, 45, 17),
(84, 5, 15, 9, 4, 540, 45, 17),
(85, 5, 15, 9, 5, 540, 45, 17),

(86, 5, 16, 10, 1, 600, 45, 18),
(87, 5, 16, 10, 2, 600, 45, 18),
(88, 5, 16, 10, 3, 600, 45, 18),
(89, 5, 16, 10, 4, 600, 45, 18),
(90, 5, 16, 10, 5, 600, 45, 18),

(91, 5, 17, 10, 1, 620, 45, 19),
(92, 5, 17, 10, 2, 620, 45, 19),
(93, 5, 17, 10, 3, 620, 45, 19),
(94, 5, 17, 10, 4, 620, 45, 19),
(95, 5, 17, 10, 5, 620, 45, 19);

