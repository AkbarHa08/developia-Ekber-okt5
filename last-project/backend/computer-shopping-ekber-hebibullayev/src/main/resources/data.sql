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
(category,name,description,os,price,drive,drive_type,cpu,ram,is_new,photo,user_username)
values
('Hp','Hp-2','Hp','Windows 11',1200,16,'ssd','intel core i7',4,true,'cdf.png','u-1');