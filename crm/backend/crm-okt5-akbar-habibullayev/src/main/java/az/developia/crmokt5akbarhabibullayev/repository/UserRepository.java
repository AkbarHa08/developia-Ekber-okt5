package az.developia.crmokt5akbarhabibullayev.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import az.developia.crmokt5akbarhabibullayev.model.User;

public interface UserRepository extends JpaRepository<User, String>{
	 	
}
