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
import az.developia.springoktyabr5project.model.Subject;
import az.developia.springoktyabr5project.repository.BookRepository;
import az.developia.springoktyabr5project.repository.ReaderGroupRepository;
import az.developia.springoktyabr5project.repository.SubjectRepository;

@RestController
@RequestMapping(path = "/subjects-rest/rest")
@CrossOrigin(origins = "*")
public class SubjectRestController {
	
	@Autowired
	private SubjectRepository subjectRepository;
	
	
	@GetMapping
	public List<Subject> getAll(){
		return subjectRepository.findAll();
	}

}
