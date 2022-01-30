insert into language(name) 
values('Az'),
('Rus');

insert into genre(name) 
values('Roman')
,('Macera')
,('Qorxu');

insert into book(name,description,author,price,page_count,language,reader_username) 
values('Test-1','Test Melumat-1','Test Yazar-5',40,90,'Az','u1')
,('Test-2','Test Melumat-2','Test Yazar-4',50,80,'Rus','u2')
,('Test-3','Test Melumat-3','Test Yazar-3',60,70,'Az','u1')
,('Test-4','Test Melumat-4','Test Yazar-2',70,60,'Rus','u2')
,('Test-5','Test Melumat-5','Test Yazar-1',80,50,'Az','u2');

insert into users(username,enabled,password)
values('u1',1,'{noop}p1'),
('u2',1,'{noop}p2');

insert into authorities(authority,username)
values('reader','u1'),('reader','u2');

insert into book_genres(book_id,genres_id) 
values(1,1),(1,2),(2,2),(2,3),(3,1),(3,3);


insert into reader_group(name,reader_username)
values('qrup-1','u1'),
('qrup-2','u1'),
('qrup-3','u2'),
('qrup-4','u2'),
('qrup-5','u2');

insert into reader_group_books(reader_group_id,books_id) 
values(1,1),(1,3),(2,2),(2,3),(3,1),(3,2),(3,3),(3,4);

