package az.developia.crmokt5akbarhabibullayev.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import javax.validation.ValidationException;

import org.hibernate.annotations.NotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import az.developia.crmokt5akbarhabibullayev.model.Customer;
import az.developia.crmokt5akbarhabibullayev.model.Ticket;
import az.developia.crmokt5akbarhabibullayev.repository.CustomerRepository;
import az.developia.crmokt5akbarhabibullayev.repository.TicketRepository;
import az.developia.crmokt5akbarhabibullayev.validation.MyValidationException;

@RestController
@RequestMapping(path = "/customers")
@CrossOrigin(origins = "*")
public class CustomerRestController {

	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private TicketRepository ticketRepository;
	
	@PostMapping
	public Customer saveCustomer(@Valid @RequestBody Customer customer,
			BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			throw new MyValidationException(bindingResult);
		}
		Customer savedCustomer = customerRepository.save(customer);
		return savedCustomer;
	}
	
	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	public ArrayList<String> handleMyValidationException(MyValidationException exception) {
		BindingResult result = exception.getBindingResult();
		ArrayList<String> errors = new ArrayList<String>();
		
		for(FieldError error : result.getFieldErrors()) {
			errors.add(error.getField()+":::"+error.getDefaultMessage());
		}
		
		return errors;
	}
	
	@GetMapping
	public List<Customer> getAllCustomers(){
		List<Customer> customers = customerRepository.findAll(); 
		return customers;
	}
	
	@GetMapping(path = "/{id}")
	public Customer getById(@PathVariable(name = "id") Integer id) {
		boolean customerExists = customerRepository.findById(id).isPresent();
		if(customerExists) {
			return customerRepository.findById(id).get();
		} else {
			throw new RuntimeException("Musteri movcud deyil! ID="+id);
		}
	}
	
	@DeleteMapping(path = "/{id}")
	public void deleteById(@PathVariable(name = "id") Integer id) {
		boolean customerExists = customerRepository.findById(id).isPresent();
		if(customerExists) {
			customerRepository.deleteById(id);
		} else {
			throw new RuntimeException("Musteri movcud deyil! ID="+id);
		}
		
		
	}
	
	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	public String handleRuntimeException(RuntimeException exception) {
		return exception.getMessage();
	}
	
	@PutMapping(path="/customer/{customerId}/ticket/{ticked}") // /customers/customer/3/ticket/2
	public void addTicketToCustomer(@PathVariable Integer customerId,@PathVariable Integer ticketId) {
		Customer c = customerRepository.findById(customerId).get();
		Ticket t = ticketRepository.findById(ticketId).get();
		c.getTickets().add(t);
		customerRepository.save(c);
		
	}
	
}
