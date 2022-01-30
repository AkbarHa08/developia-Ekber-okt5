package az.developia.springoktyabr5project.controller.rest;

import java.util.ArrayList;
import java.util.List;

import javax.management.RuntimeErrorException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import az.developia.springoktyabr5project.model.Book;
import az.developia.springoktyabr5project.model.ReaderGroup;
import az.developia.springoktyabr5project.model.Search;
import az.developia.springoktyabr5project.repository.BookRepository;
import az.developia.springoktyabr5project.repository.ReaderGroupRepository;

@RestController
@RequestMapping(path = "/books/rest")
@CrossOrigin(origins = "*")
public class BookRestController {
	
	 @Autowired
	    private BookRepository bookRepository;
	 
	 @Autowired
	 private ReaderGroupRepository readerGroupRepository;
	

	@GetMapping(path = "/user/{username}")
	    public List<Book> getBooks(@PathVariable String username) {
	        List<Book> books = bookRepository.findAllByReaderUsername(username);

	        return books;	
	    } 	
	
	private String findRealUsername() {
		
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}
	 
	@PostMapping(path = "/user/{username}")
    public ArrayList<String> addBook(@Valid @RequestBody Book book, BindingResult br, @PathVariable String username) {
		if(findRealUsername().equals(username)) {
			
		} else {
			throw new RuntimeException("basqa oxuyucunun adina kitab qeydiyyat etmek olmur");
		}
		
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
			book.setReaderUsername(username);
			 bookRepository.save(book);
		}
		return errorMessages;
     

    }
	
	@DeleteMapping(path="/{id}")
	public void delete(@PathVariable Integer id) {
		
		deleteBookById(id);	
		
	}
	
	@GetMapping(path="/{id}")
	public Book getById(@PathVariable Integer id) {
		Book b = bookRepository.findById(id).get();
		if(b.getReaderUsername().equals(findRealUsername())) {
			return bookRepository.findById(id).get();
		} else {
			throw new RuntimeException("Basqa oxuyucunun kitabini gormek olmaz!");
		}
		
		
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
			book.setReaderUsername(findRealUsername());
			 bookRepository.save(book);
		}
		return errorMessages;

    }
	
	@PostMapping(path="/search") 
	public List<Book> searchBooks(@RequestBody Search search){
			
		
		
		return bookRepository.findAllSearch(search.getSearchText(),findRealUsername());
	}
	
	
	
	
	@DeleteMapping(path = "/delete-all")
	public void deleteAll(@RequestBody List<Integer> bookIds) {
		for (Integer id : bookIds) {
			deleteBookById(id);
		}
	}
	
	@ExceptionHandler
	public String handle(RuntimeException ex) {
		return ex.getMessage();
	}
	
	private void deleteBookById(Integer id) {
		Book b = bookRepository.findById(id).get();
		if(b.getReaderUsername().equals(findRealUsername())) {
			List<ReaderGroup> groups = readerGroupRepository.findAll();
			for (ReaderGroup readerGroup : groups) {
				readerGroup.getBooks().remove(b);
			}
			readerGroupRepository.saveAll(groups);
			bookRepository.deleteById(id);
		} else {
			throw new RuntimeException("You can't delete another reader's book!");
		}
	}
	
	@GetMapping(path = "/group/{groupId}") // /books/rest/group/12
	public List<Book> getBooksForGroup(@PathVariable Integer groupId){
		ReaderGroup group = readerGroupRepository.findById(groupId).get();
		return group.getBooks();
	}
	
	
	
	
}
