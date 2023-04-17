create table register (
    id serial not null primary key,
    email text not null,
    password not null varchar(10)
);

create table brands(
    id serial not null primary key,
    brand text not null
);

create table stockimages(
    id serial not null primary key,
    image text not null
);

create table sizes(
    id serial not null primary key,
    size text not null
);

create table colors(
    id serial not null primary key,
    brand_id int not null,
    color text not null,
    foreign key (brand_id) references brands(id)
);

create table names(
    id serial not null primary key,
    brand_id int not null,
    shoe_name int not null,
    foreign key (brand_id) references brands(id)
);

create table stock(
    id serial not null primary key,
    brand_id int not null,
    color_id int not null,
    names_id int not null,
    size_id int not null,
    price int not null,
    quantity int not null,
    image_id int not null,
    foreign key (brand_id) references brands(id),
    foreign key (color_id) references colors(id),
    foreign key (names_id) references names(id),
    foreign key (size_id) references sizes(id),
    foreign key (image_id) references stockimages(id)
);

create table cart(
    id serial not null primary key,
    brand int not null,
    color int not null,
    size int not null,
    price int not null,
    quantity int not null,
	stock_id int not null,
    register_id int not null,
    cart_image int not null,
	foreign key (stock_id) references stock(id)
    foreign key (register_id) references register(id)
);

/*Afani images*/
insert into stockimages (id, image) values (1, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Afani/Black.JPG?raw=true');
insert into stockimages (id, image) values (2, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Afani/Grey.JPG?raw=true');
insert into stockimages (id, image) values (3, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Afani/Navy.JPG?raw=true');
insert into stockimages (id, image) values (4, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Afani/White.JPG?raw=true');

/*Bellito images*/
insert into stockimages (id, image) values (5, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Bellito/Green-Top.jpg?raw=true');
insert into stockimages (id, image) values (6, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Bellito/Green.jpg?raw=true');
insert into stockimages (id, image) values (7, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Bellito/White%20boots.jpg?raw=true');
insert into stockimages (id, image) values (8, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Bellito/White.jpg?raw=true');

/*Seruto images*/
insert into stockimages (id, image) values (9, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Seruto/Light-Blue.JPG?raw=true');
insert into stockimages (id, image) values (10, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Seruto/Light-Green.JPG?raw=true');
insert into stockimages (id, image) values (11, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Seruto/Red.JPG?raw=true');
insert into stockimages (id, image) values (12, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Seruto/Yellow.JPG?raw=true');

/*Tago images*/
insert into stockimages (id, image) values (13, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Tago/black.jpg?raw=true');
insert into stockimages (id, image) values (14, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Tago/brown.jpg?raw=true');
insert into stockimages (id, image) values (15, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Tago/white.jpg?raw=true');

/*Zing images*/
insert into stockimages (id, image) values (16, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Zing/Black-Green.jpg?raw=true');
insert into stockimages (id, image) values (17, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Zing/Black-White.jpg?raw=true');
insert into stockimages (id, image) values (18, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Zing/Green.jpg?raw=true');
insert into stockimages (id, image) values (19, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Zing/White.jpg?raw=true');

/*Shoe sizes*/
insert into sizes (id, size) values (1, 5);
insert into sizes (id, size) values (2, 6);
insert into sizes (id, size) values (3, 7);
insert into sizes (id, size) values (4, 8);
insert into sizes (id, size) values (5, 9);

/*All brands*/
insert into brands (id, brand) values (1, 'afani');
insert into brands (id, brand) values (2, 'bellito');
insert into brands (id, brand) values (3, 'seruto');
insert into brands (id, brand) values (4, 'tago');
insert into brands (id, brand) values (5, 'zing');


/*all brand colors*/
/*Afani colors*/
insert into colors (id, brand_id, color) values (1, 1, 'black');
insert into colors (id, brand_id, color) values (2, 1, 'grey');
insert into colors (id, brand_id, color) values (3, 1, 'navy');
insert into colors (id, brand_id, color) values (4, 1, 'white');

/*Bellito colors*/
insert into colors (id, brand_id, color) values (5, 2, 'green');
insert into colors (id, brand_id, color) values (6, 2, 'white');

/*Seruto images*/
insert into colors (id, brand_id, color) values (7, 3, 'light-blue');
insert into colors (id, brand_id, color) values (8, 3, 'light-green');
insert into colors (id, brand_id, color) values (9, 3, 'red');
insert into colors (id, brand_id, color) values (10, 3, 'yellow');

/*Tago*/
insert into colors (id, brand_id, color) values (11, 4, 'black');
insert into colors (id, brand_id, color) values (12, 4, 'brown');
insert into colors (id, brand_id, color) values (13, 4, 'white');

/*Zing*/
insert into colors (id, brand_id, color) values (14, 5, 'black-green');
insert into colors (id, brand_id, color) values (15, 5, 'black-white');
insert into colors (id, brand_id, color) values (16, 5, 'green');
insert into colors (id, brand_id, color) values (17, 5, 'white');



/*Afani names*/
insert into names (id, brand_id, shoe_name) values (1, 1, 'oxion');
insert into names (id, brand_id, shoe_name) values (2, 1, 'high x');

/*Bellito names*/
insert into names (id, brand_id, shoe_name) values (3, 2, 't brass');
insert into names (id, brand_id, shoe_name) values (4, 2, 'wild R5s');

/*Seruto names*/
insert into names (id, brand_id, shoe_name) values (5, 3, 'cool 6');

/*Tago names*/
insert into names (id, brand_id, shoe_name) values (6, 4, 'mac g');
insert into names (id, brand_id, shoe_name) values (7, 4, 'flat t');
insert into names (id, brand_id, shoe_name) values (8, 4, 'superfly');

/*Zing names*/
insert into names (id, brand_id, shoe_name) values (9, 5, 'aqua flex');
insert into names (id, brand_id, shoe_name) values (10, 5, 'zenlife');



/*AFANI STOCK ITEMS*/
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (1, 1, 1, 1, 1, 700, 45, 1);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (2, 1, 1, 1, 2, 700, 45, 1);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (3, 1, 1, 1, 3, 700, 45, 1);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (4, 1, 1, 1, 4, 700, 45, 1);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (5, 1, 1, 1, 5, 700, 45, 1);


insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (6, 1, 4, 1, 1, 700, 45, 4);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (7, 1, 4, 1, 2, 700, 45, 4);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (8, 1, 4, 1, 3, 700, 45, 4);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (9, 1, 4, 1, 4, 700, 45, 4);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (10, 1, 4, 1, 5, 700, 45, 4);


insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (11, 1, 3, 2, 1, 740, 45, 3);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (12, 1, 3, 2, 2, 740, 45, 3);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (13, 1, 3, 2, 3, 740, 45, 3);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (14, 1, 3, 2, 4, 740, 45, 3);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (15, 1, 3, 2, 5, 740, 45, 3);


insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (16, 1, 2, 2, 1, 740, 45, 2);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (17, 1, 2, 2, 2, 740, 45, 2);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (18, 1, 2, 2, 3, 740, 45, 2);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (19, 1, 2, 2, 4, 740, 45, 2);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (20, 1, 2, 2, 5, 740, 45, 2);




/*BELLITO STOCK ITEMS BOOTS*/
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (21, 2, 5, 3, 1, 850, 45, 5);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (22, 2, 5, 3, 2, 850, 45, 5);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (23, 2, 5, 3, 3, 850, 45, 5);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (24, 2, 5, 3, 4, 850, 45, 5);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (25, 2, 5, 3, 5, 850, 45, 5);

insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (26, 2, 6, 3, 1, 850, 45, 7);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (27, 2, 6, 3, 2, 850, 45, 7);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (28, 2, 6, 3, 3, 850, 45, 7);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (29, 2, 6, 3, 4, 850, 45, 7);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (30, 2, 6, 3, 5, 850, 45, 7);


insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (31, 2, 5, 4, 1, 900, 45, 6);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (32, 2, 5, 4, 2, 900, 45, 6);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (33, 2, 5, 4, 3, 900, 45, 6);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (34, 2, 5, 4, 4, 900, 45, 6);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (35, 2, 5, 4, 5, 900, 45, 6);

insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (36, 2, 6, 4, 1, 970, 45, 8);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (37, 2, 6, 4, 2, 970, 45, 8);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (38, 2, 6, 4, 3, 970, 45, 8);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (39, 2, 6, 4, 4, 970, 45, 8);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (40, 2, 6, 4, 5, 970, 45, 8);




/*SERUTO STOCK ITEMS*/
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (41, 3, 7, 5, 1, 300, 45, 9);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (42, 3, 7, 5, 2, 300, 45, 9);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (43, 3, 7, 5, 3, 300, 45, 9);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (44, 3, 7, 5, 4, 300, 45, 9);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (45, 3, 7, 5, 5, 300, 45, 9);

insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (46, 3, 8, 5, 1, 300, 45, 10);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (47, 3, 8, 5, 2, 300, 45, 10);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (48, 3, 8, 5, 3, 300, 45, 10);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (49, 3, 8, 5, 4, 300, 45, 10);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (50, 3, 8, 5, 5, 300, 45, 10);

insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (51, 3, 9, 5, 1, 300, 45, 11);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (52, 3, 9, 5, 2, 300, 45, 11);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (53, 3, 9, 5, 3, 300, 45, 11);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (54, 3, 9, 5, 4, 300, 45, 11);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (55, 3, 9, 5, 5, 300, 45, 11);

insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (56, 3, 10, 5, 1, 300, 45, 12);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (57, 3, 10, 5, 2, 300, 45, 12);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (58, 3, 10, 5, 3, 300, 45, 12);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (59, 3, 10, 5, 4, 300, 45, 12);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (60, 3, 10, 5, 5, 300, 45, 12);



/*TAGO STOCK ITEMS*/
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (61, 4, 13, 6, 1, 1200, 45, 13);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (62, 4, 13, 6, 2, 1200, 45, 13);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (63, 4, 13, 6, 3, 1200, 45, 13);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (64, 4, 13, 6, 4, 1200, 45, 13);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (65, 4, 13, 6, 5, 1200, 45, 13);

insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (66, 4, 12, 7, 1, 1300, 45, 14);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (67, 4, 12, 7, 2, 1300, 45, 14);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (68, 4, 12, 7, 3, 1300, 45, 14);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (69, 4, 12, 7, 4, 1300, 45, 14);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (70, 4, 12, 7, 5, 1300, 45, 14);

insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (71, 4, 11, 8, 1, 2000, 45, 15);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (72, 4, 11, 8, 2, 2000, 45, 15);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (73, 4, 11, 8, 3, 2000, 45, 15);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (74, 4, 11, 8, 4, 2000, 45, 15);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (75, 4, 11, 8, 5, 2000, 45, 15);




/*ZING STOCK ITEMS*/
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (76, 5, 14, 9, 1, 570, 45, 16);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (77, 5, 14, 9, 2, 570, 45, 16);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (78, 5, 14, 9, 3, 570, 45, 16);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (79, 5, 14, 9, 4, 570, 45, 16);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (80, 5, 14, 9, 5, 570, 45, 16);

insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (81, 5, 15, 9, 1, 540, 45, 17);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (82, 5, 15, 9, 2, 540, 45, 17);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (83, 5, 15, 9, 3, 540, 45, 17);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (84, 5, 15, 9, 4, 540, 45, 17);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (85, 5, 15, 9, 5, 540, 45, 17);

insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (86, 5, 16, 10, 1, 600, 45, 18);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (87, 5, 16, 10, 2, 600, 45, 18);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (88, 5, 16, 10, 3, 600, 45, 18);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (89, 5, 16, 10, 4, 600, 45, 18);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (90, 5, 16, 10, 5, 600, 45, 18);

insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (91, 5, 17, 10, 1, 620, 45, 19);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (92, 5, 17, 10, 2, 620, 45, 19);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (93, 5, 17, 10, 3, 620, 45, 19);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (94, 5, 17, 10, 4, 620, 45, 19);
insert into stock ( id, brand_id, color_id, names_id, size_id, price, quantity, image_id) values (95, 5, 17, 10, 5, 620, 45, 19);

