insert into users
(username,password,enabled)
values
('u-1','{noop}1',1),('u-2','{noop}2',1),('u-3','{noop}3',1),('u-4','{noop}4',1);

insert into authorities
(username,authority)
values
('u-1','user'),('u-2','user'),('u-3','user'),('u-4','user');

insert into categories
(name)
values
('Acer'),('Hp'),('Apple'),('Asus');

insert into computers
(category,name,description,os,price,drive,drive_type,cpu,ram,is_new,photo,user_username)
values
('Hp','Hp-1','Hp','Windows 11',1200,16,'ssd','intel core i7',4,true,'f6ccbcc8-5fe4-4086-833d-b00f5b9e6a14.png','u-1'),
('Acer','Acer-1','Acer','Windows 10',900,8,'hdd','intel core i5',2,true,'bcab912c-effe-427c-913c-fc980050009b.jpg','u-2'),
('Asus','Asus-1','Hp','Windows 11',2500,32,'ssd','intel core i9',8,true,'9fa8c842-e94b-47b3-aa48-9ab0323cb658.jpg	','u-3'),
('Apple','Apple-1','Apple','MacOS',2000,8,'ssd','intel core i3',8,true,'4fcb4a04-cf47-4d15-9dfc-5a380985eadf.jpg','u-4');