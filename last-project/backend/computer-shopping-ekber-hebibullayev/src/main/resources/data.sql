insert into users
(username,password,enabled)
values
('u-1','{noop}1',1);

insert into authorities
(username,authority)
values
('u-1','user');

insert into categories
(name)
values
('Acer'),('Hp'),('Apple'),('Asus');

insert into computers
(name,description,os,price,drive,drive_type,cpu,ram,is_new,photo,user_id,category_id)
values
('Acer-2','dasd','Windows 10',300,4,'hdd','intel i7',2,true,'cdf.png','u-1',1);