package az.developia.springoktyabr5project.repository;

import az.developia.springoktyabr5project.model.Book;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {

	public List<Book> findAllByName(String name);

}
