insert into language(name) 
values('Az'),
('Rus');

insert into genre(name) 
values('Roman')
,('Macera')
,('Qorxu');

insert into book(name,description,author,price,page_count,language,reader_username) 
values('Test','Test Melumat','Test Yazar',40,50,'Az','u1')
,('Test','Test Melumat','Test Yazar',40,50,'Rus','u2')
,('Test','Test Melumat','Test Yazar',40,50,'Az','u1');

insert into users(username,enabled,password)
values('u1',1,'{noop}p1'),
('u2',1,'{noop}p2');

insert into authorities(authority,username)
values('reader','u1'),('reader','u2');

insert into book_genres(book_id,genres_id) 
values(1,1),(1,2),(2,2),(2,3),(3,1),(3,3);