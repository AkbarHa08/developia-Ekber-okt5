package az.developia.springoktyabr5project.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import az.developia.springoktyabr5project.Search;
import az.developia.springoktyabr5project.model.Book;
import az.developia.springoktyabr5project.repository.BookRepository;

@RestController
@RequestMapping(path = "/books/rest")
@CrossOrigin(origins = "*")
public class BookRestController {
	
	 @Autowired
	    private BookRepository bookRepository;
	

	@PostMapping
    public ArrayList<String> addBook(@Valid @RequestBody Book book, BindingResult br) {
		ArrayList<String> errorMessages = new ArrayList<String>();
		if(br.hasErrors()) {
			System.out.println("melumatlar tam deyil!");
			
			for (FieldError error : br.getFieldErrors()) {
				System.out.println(error.getField());
				System.out.println(error.getDefaultMessage());
				System.out.println("---------------------------");
				errorMessages.add(error.getField()+":::"+error.getDefaultMessage());
			}
		}else {
			 bookRepository.save(book);
		}
		return errorMessages;
     

    }
	
	@DeleteMapping(path="/{id}")
	public void delete(@PathVariable Integer id) {
		bookRepository.deleteById(id);
	}
	
	@GetMapping(path="/{id}")
	public Book getById(@PathVariable Integer id) {
		return bookRepository.findById(id).get();
	}
	
	@PutMapping
    public ArrayList<String> updateBook(@Valid @RequestBody Book book, BindingResult br) {
		ArrayList<String> errorMessages = new ArrayList<String>();
		if(br.hasErrors()) {
			System.out.println("melumatlar tam deyil!");
			
			for (FieldError error : br.getFieldErrors()) {
				System.out.println(error.getField());
				System.out.println(error.getDefaultMessage());
				System.out.println("---------------------------");
				errorMessages.add(error.getField()+":::"+error.getDefaultMessage());
			}
		}else {
			 bookRepository.save(book);
		}
		return errorMessages;

    }
	
	@PostMapping(path="/search") 
	public List<Book> searchBooks(@RequestBody Search search){
		 
		return bookRepository.findAllSearch(search.getSearchText());
	}
	
	@DeleteMapping(path = "/delete-all")
	public void deleteAll(@RequestBody List<Integer> bookIds) {
		for (Integer id : bookIds) {
			bookRepository.deleteById(id);
		}
	}
}
