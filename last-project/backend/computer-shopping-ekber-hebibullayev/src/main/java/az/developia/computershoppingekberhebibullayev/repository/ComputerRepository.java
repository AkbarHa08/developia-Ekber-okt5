package az.developia.computershoppingekberhebibullayev.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import az.developia.computershoppingekberhebibullayev.model.Computer;

public interface ComputerRepository extends JpaRepository<Computer, Integer> {

	public List<Computer> findAllByUserUsername(String userUsername);

	public List<Computer> findAllByCategory(String category);
	
	@Query(value = "select * from computers where name like %?1% or description like %?1% or price like %?1% or cpu like %?1% or drive_type like %?1%",nativeQuery = true)
	public List<Computer> findAllByName(String search);
}
