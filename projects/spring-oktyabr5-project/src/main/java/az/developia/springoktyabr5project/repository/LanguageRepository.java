package az.developia.springoktyabr5project.repository;

import az.developia.springoktyabr5project.model.Book;
import az.developia.springoktyabr5project.model.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, Integer> {


}
