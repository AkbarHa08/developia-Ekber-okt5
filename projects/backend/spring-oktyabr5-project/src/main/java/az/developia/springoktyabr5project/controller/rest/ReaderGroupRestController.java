package az.developia.springoktyabr5project.controller.rest;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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
import org.springframework.web.bind.annotation.RestController;

import az.developia.springoktyabr5project.model.Book;
import az.developia.springoktyabr5project.model.Genre;
import az.developia.springoktyabr5project.model.ReaderGroup;
import az.developia.springoktyabr5project.repository.BookRepository;
import az.developia.springoktyabr5project.repository.ReaderGroupRepository;

@RestController
@RequestMapping(path = "/reader-groups/rest")
@CrossOrigin(origins = "*")
public class ReaderGroupRestController {
	
	@Autowired
	private ReaderGroupRepository readerGroupRepository;
	
	@Autowired
	private BookRepository bookRepository;
	
	@GetMapping
	public List<ReaderGroup> getGroups(){
		return readerGroupRepository.findAll();
	}
	
	@GetMapping(path = "/user/{username}")
    public List<ReaderGroup> getGroupsByUsername(@PathVariable String username) {
        List<ReaderGroup> groups = readerGroupRepository.findAllByReaderUsername(username);

        return groups;	
    } 	
	
	private String findRealUsername() {
		
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}
	
	@PostMapping(path = "/user/{username}")
    public ArrayList<String> addGroup(@Valid @RequestBody ReaderGroup readerGroup, BindingResult br, @PathVariable String username) {
		if(findRealUsername().equals(username)) {
			
		} else {
			throw new RuntimeException("basqa oxuyucunun adina qrup qeydiyyat etmek olmur");
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
			readerGroup.setReaderUsername(username);
			 readerGroupRepository.save(readerGroup);
		}
		return errorMessages;
     

    }
	
	@DeleteMapping(path="/{id}")
	public void delete(@PathVariable Integer id) {
		ReaderGroup g = readerGroupRepository.findById(id).get();
		if(g.getReaderUsername().equals(findRealUsername())) {
			readerGroupRepository.deleteById(id);
		} else {
			throw new RuntimeException("Basqa oxuyucunun qrupunu silmek olmaz!");
		}
		
		
	}
	
	@DeleteMapping(path = "/delete-all")
	public void deleteAll(@RequestBody List<Integer> groupIds) {
		for (Integer id : groupIds) {
			ReaderGroup g = readerGroupRepository.findById(id).get();
			if(g.getReaderUsername().equals(findRealUsername())) {
				readerGroupRepository.deleteById(id);
			} else {
				throw new RuntimeException("Basqa oxuyucunun qrupunu silmek olmaz!");
			}
			
		}
	}
	
	@PutMapping	(path = "/group/{groupId}/book/{bookId}") // /reader-groups/rest/group/2/book/2
    public void addBookToGroup(@PathVariable Integer groupId, @PathVariable Integer bookId) {
		ReaderGroup group = readerGroupRepository.findById(groupId).get();
		Book book = bookRepository.findById(bookId).get();	
		group.getBooks().add(book);
		readerGroupRepository.save(group);

    } 
	
	@DeleteMapping(path = "/remove-book/group/{groupId}/book/{bookId}") // /reader-groups/rest/remove-book/group/2/book/2
    public void removeBookFromGroup(@PathVariable Integer groupId, @PathVariable Integer bookId) {
		ReaderGroup group = readerGroupRepository.findById(groupId).get();
		Book book = bookRepository.findById(bookId).get();	
		group.getBooks().remove(book);
		readerGroupRepository.save(group); 

    } 

}
