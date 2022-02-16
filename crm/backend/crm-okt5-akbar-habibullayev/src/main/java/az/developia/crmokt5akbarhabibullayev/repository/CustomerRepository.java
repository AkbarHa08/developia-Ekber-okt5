package az.developia.crmokt5akbarhabibullayev.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import az.developia.crmokt5akbarhabibullayev.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	
	public Customer findByEmail(String email);
	public Customer findByPhone(String phone);
	public Customer findByIdNumber(String idNumber);
	public Customer findByIdFin(String idFin);

}
