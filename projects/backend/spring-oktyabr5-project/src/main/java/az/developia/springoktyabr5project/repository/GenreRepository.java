package az.developia.springoktyabr5project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import az.developia.springoktyabr5project.model.Genre;

public interface GenreRepository extends JpaRepository<Genre, Integer> {

}
