package az.developia.computershoppingekberhebibullayev.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import az.developia.computershoppingekberhebibullayev.model.Category;
import az.developia.computershoppingekberhebibullayev.repository.CategoryRepository;

@RestController
@RequestMapping(path = "/categories")
@CrossOrigin(origins = "*")
public class CategoryRestController {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@GetMapping
	public List<Category> getAllCategories(){
		return categoryRepository.findAll();
	}
}
