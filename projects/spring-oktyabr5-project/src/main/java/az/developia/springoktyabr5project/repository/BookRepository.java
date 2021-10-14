package az.developia.springoktyabr5project.repository;

import az.developia.springoktyabr5project.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {


}
