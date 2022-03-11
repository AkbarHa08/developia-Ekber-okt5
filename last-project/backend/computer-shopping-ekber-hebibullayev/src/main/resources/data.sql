insert into users
(username,password,enabled)
values
('u-1','{noop}1',1),('u-2','{noop}2',1),('u-3','{noop}3',1);

insert into authorities
(username,authority)
values
('u-1','user'),('u-2','user'),('u-3','user');

insert into categories
(name)
values
('Acer'),('Hp'),('Apple'),('Asus');

insert into computers
(category,name,description,os,price,drive,drive_type,cpu,ram,is_new,photo,user_username)
values
('Hp','Hp-1','Hp','Windows 11',1200,16,'ssd','intel core i7',4,true,'cdf.png','u-1'),
('Acer','Acer-1','Acer','Windows 10',900,8,'hdd','intel core i5',2,true,'cdf.png','u-2'),
('Asus','Asus-1','Hp','Windows 11',2500,32,'ssd','intel core i9',8,true,'cdf.png','u-3');