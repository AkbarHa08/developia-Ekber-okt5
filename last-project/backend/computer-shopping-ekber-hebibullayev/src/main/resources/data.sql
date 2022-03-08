insert into users
(username,password,enabled)
values
('u-1','{noop}1',1);

insert into authorities
(username,authority)
values
('u-1','user');