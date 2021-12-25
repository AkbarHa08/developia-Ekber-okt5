package az.developia.springoktyabr5project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import az.developia.springoktyabr5project.model.User;

public interface UserRepository extends JpaRepository<User, String> {

}
