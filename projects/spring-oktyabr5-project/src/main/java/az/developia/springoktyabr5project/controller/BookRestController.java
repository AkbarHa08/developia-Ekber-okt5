package az.developia.springoktyabr5project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import az.developia.springoktyabr5project.model.Book;
import az.developia.springoktyabr5project.repository.BookRepository;

@Controller
@RequestMapping(path = "/books/rest")
@CrossOrigin(origins = "*")
public class BookRestController {
	
	 @Autowired
	    private BookRepository bookRepository;
	

	@PostMapping
    public void addBook(@RequestBody Book book) {
      bookRepository.save(book);

    }
	
	@DeleteMapping(path="/{id}")
	public void delete(@PathVariable Integer id) {
		bookRepository.deleteById(id);
	}
	
	@GetMapping(path="/{id}")
	public Book getById(@PathVariable Integer id) {
		return bookRepository.findById(id).get();
	}
	
}
