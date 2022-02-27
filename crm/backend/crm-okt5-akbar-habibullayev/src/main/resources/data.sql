insert into users
(username,password,enabled)
values
('company-1','{noop}1',true);

insert into authorities
(id,authority,username)
values
(1,'company','company-1');

insert into NATIONALITY
(name)
values
('Azerbaycan'),('Rus'),('Ingilis'),('Alman');

insert into CUSTOMER
(name,surname,phone,email,birthday,address,gender,id_number,id_fin,	NATIONALITY_ID)
values
('Adil','Əliyev','055-999-99-99','adil@gmail.com','1999-04-09','Azerbaycan','male','AZ23132','FAJDKC', 1);

