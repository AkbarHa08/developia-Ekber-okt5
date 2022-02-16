package az.developia.crmokt5akbarhabibullayev.controller;

import javax.validation.Valid;
import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import az.developia.crmokt5akbarhabibullayev.model.Customer;
import az.developia.crmokt5akbarhabibullayev.repository.CustomerRepository;
import az.developia.crmokt5akbarhabibullayev.validation.MyValidationException;

@RestController
@RequestMapping(path = "/customers")
@CrossOrigin(origins = "*")
public class CustomerRestController {

	@Autowired
	private CustomerRepository customerRepository;
	
	@PostMapping
	public Customer saveCustomer(@Valid @RequestBody Customer customer,
			BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			throw new MyValidationException(bindingResult);
		}
		Customer savedCustomer = customerRepository.save(customer);
		return savedCustomer;
	}
	
}
