create table register (
    id serial not null primary key,
    email text not null,
    password not null varchar(10)
);

create table brands(
    id serial not null primary key,
    brand text not null
);

create table colors(
    id serial not null primary key,
    color text not null
);

create table stockimages(
    id serial not null primary key,
    image text not null
);

create table stock(
    id serial not null primary key,
    brand_id int not null,
    color_id int not null,
    size_id int not null,
    price int not null,
    quantity int not null,
    image_id int not null,
    foreign key (brand_id) references brands(id),
    foreign key (color_id) references colors(id),
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

/*bellito images*/

insert into stockimages (id, image) values (5, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Bellito/Green-Top.jpg?raw=true');
insert into stockimages (id, image) values (6, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Bellito/Green.jpg?raw=true');
insert into stockimages (id, image) values (7, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Bellito/Men"s%20White%20boots.jpg?raw=true');
insert into stockimages (id, image) values (8, 'https://github.com/Wiseman930/shoe-cart-api/blob/master/Images/Afani/White.JPG?raw=true');