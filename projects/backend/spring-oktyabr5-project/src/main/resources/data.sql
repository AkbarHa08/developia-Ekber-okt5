insert into language(name) 
values('Az'),
('Rus');

insert into genre(name) 
values('Roman')
,('Macera')
,('Qorxu');

insert into book(name,description,author,price,page_count,language) 
values('Test','Test Melumat','Test Yazar',40,50,'Az')
,('Test','Test Melumat','Test Yazar',40,50,'Rus')
,('Test','Test Melumat','Test Yazar',40,50,'Az');

insert into book_genres(book_id,genres_id) 
values(1,1),(1,2);