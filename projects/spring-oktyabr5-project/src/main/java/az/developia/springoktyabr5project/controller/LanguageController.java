package az.developia.springoktyabr5project.controller;

import az.developia.springoktyabr5project.model.Book;
import az.developia.springoktyabr5project.model.Language;
import az.developia.springoktyabr5project.repository.BookRepository;
import az.developia.springoktyabr5project.repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;
import java.util.List;

@Controller
public class LanguageController {

    @Autowired
    private LanguageRepository languageRepository;



    @GetMapping(path="/languages")
    public String showLanguages(Model model) {
        List<Language> languages = languageRepository.findAll();


        model.addAttribute("languages", languages);
        return "languages";
    }

    @GetMapping(path = "/languages/open/save")
    public String showSaveLanguage(Model model) {
        Language l = new Language();
        model.addAttribute("language", l);
        model.addAttribute("header","Yeni dil qeydiyyati");

        return "save-language";
    } 
    @PostMapping(path = "/languages/save")
    public String addLanguage(@Valid @ModelAttribute(name = "language") Language l, BindingResult result) {
        if(result.hasErrors()) {
            return "save-language";
        }

        languageRepository.save(l);

        return "redirect:/languages";
    }

    @GetMapping(path = "/languages/delete/{id}")
    public String deleteLanguage(@PathVariable Integer id, Model model) {

        languageRepository.deleteById(id);

        return "redirect:/languages";
    }
    
    @GetMapping(path = "/languages/edit/{id}")
    public String editLanguage(@PathVariable Integer id, Model model) {
        Language l = languageRepository.findById(id).get();
        model.addAttribute("language", l);
        model.addAttribute("header","Dil redaktesi");

        return "save-language";
    }

}
