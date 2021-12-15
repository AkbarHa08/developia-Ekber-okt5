package az.developia.springoktyabr5project.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import az.developia.springoktyabr5project.model.Language;
import az.developia.springoktyabr5project.repository.LanguageRepository;

@RestController
@RequestMapping(path="/languages/rest")
@CrossOrigin(origins="*")
public class LanguageRestController {
	@Autowired
	private LanguageRepository languageRepository;
	
	@GetMapping
    public List<Language> getLanguages() {
        List<Language> languages = languageRepository.findAll();


        return languages;
    }
	
}
