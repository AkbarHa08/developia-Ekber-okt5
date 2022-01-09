package az.developia.springoktyabr5project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import az.developia.springoktyabr5project.model.Book;
import az.developia.springoktyabr5project.model.ReaderGroup;

public interface ReaderGroupRepository extends JpaRepository<ReaderGroup, Integer> {
	
	public List<ReaderGroup> findAllByReaderUsername(String username);

}
