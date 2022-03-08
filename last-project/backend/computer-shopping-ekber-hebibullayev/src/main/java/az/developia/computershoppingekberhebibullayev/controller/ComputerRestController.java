package az.developia.computershoppingekberhebibullayev.controller;

import java.util.ArrayList;

import javax.naming.Binding;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import az.developia.computershoppingekberhebibullayev.model.Computer;
import az.developia.computershoppingekberhebibullayev.repository.CategoryRepository;
import az.developia.computershoppingekberhebibullayev.repository.ComputerRepository;
import az.developia.computershoppingekberhebibullayev.repository.UserRepository;
import az.developia.computershoppingekberhebibullayev.validation.MyValidationException;

@RestController
@RequestMapping(path = "/computers")
@CrossOrigin(origins = "*")
public class ComputerRestController {

	@Autowired
	private ComputerRepository computerRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@PostMapping
	public Computer saveComputer(@Valid @RequestBody Computer computer, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			throw new MyValidationException(bindingResult);
		}
		Computer savedComputer = computerRepository.save(computer);
		return savedComputer;
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
	
	@GetMapping(path = "/{id}")
	public Computer getById(@PathVariable(name = "id") Integer id) {
		boolean computerExists = computerRepository.findById(id).isPresent();
		if(computerExists) {
			return computerRepository.findById(id).get();
		} else {
			throw new RuntimeException("Musteri movcud deyil! Id="+id);
		}
	}
}
