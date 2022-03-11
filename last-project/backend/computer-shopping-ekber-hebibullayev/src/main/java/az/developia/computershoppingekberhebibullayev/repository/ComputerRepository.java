package az.developia.computershoppingekberhebibullayev.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import az.developia.computershoppingekberhebibullayev.model.Computer;

public interface ComputerRepository extends JpaRepository<Computer, Integer> {

	public List<Computer> findAllByUserUsername(String userUsername);
}
