package az.developia.springoktyabr5project.controller;

import java.util.List;

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
import az.developia.springoktyabr5project.model.Genre;
import az.developia.springoktyabr5project.repository.BookRepository;
import az.developia.springoktyabr5project.repository.GenreRepository;

@Controller
@RequestMapping(path = "/genres/rest")
@CrossOrigin(origins = "*")
public class GenreRestController {
	
	@Autowired
    private GenreRepository genreRepository;
	
	
	 
	@GetMapping
	public List<Genre> getAll(){
		return genreRepository.findAll();
	}

	
	
}
