package az.developia.computershoppingekberhebibullayev.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import az.developia.computershoppingekberhebibullayev.model.User;

public interface UserRepository extends JpaRepository<User, String> {

}
