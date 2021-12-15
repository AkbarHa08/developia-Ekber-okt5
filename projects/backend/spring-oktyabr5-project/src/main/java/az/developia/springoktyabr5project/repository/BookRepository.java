package az.developia.springoktyabr5project.repository;

import az.developia.springoktyabr5project.model.Book;
import az.developia.springoktyabr5project.model.Search;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book, Integer> {

	public List<Book> findAllByName(String name);
	
	public String sorgu="select * from book where name like %?1% or description like %?1% or author like %?1% or price like %?1% or page_count like %?1% or language like %?1%";
	
	@Query(value=sorgu,nativeQuery = true)
	public List<Book> findAllSearch(String search);

} 
