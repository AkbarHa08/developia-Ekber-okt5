package az.developia.springoktyabr5project.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import az.developia.springoktyabr5project.model.Genre;
import az.developia.springoktyabr5project.model.Language;
import az.developia.springoktyabr5project.repository.GenreRepository;
import az.developia.springoktyabr5project.repository.LanguageRepository;

@Controller
public class GenreController {

    @Autowired
    private GenreRepository genreRepository;


    	
    @GetMapping(path="/genres")
    public String showGenres(Model model) {
        List<Genre> genres = genreRepository.findAll();

        model.addAttribute("genres", genres);
        return "genres";
    }

    @GetMapping(path = "/genres/open/save")
    public String showSaveGenre(Model model) {
        Genre g = new Genre();
        model.addAttribute("genre", g);
        model.addAttribute("header","Yeni janr qeydiyyati");

        return "save-genre";
    } 
    @PostMapping(path = "/genres/save")
    public String addGenres(@Valid @ModelAttribute(name = "genre") Genre g, BindingResult result) {
        if(result.hasErrors()) {
            return "save-genre";
        }

        genreRepository.save(g);

        return "redirect:/genres";
    }

    @GetMapping(path = "/genres/delete/{id}")
    public String deleteGenre(@PathVariable Integer id) {

        genreRepository.deleteById(id);

        return "redirect:/genres";
    }
    
    @GetMapping(path = "/genres/edit/{id}")
    public String editGenre(@PathVariable Integer id, Model model) {
        Genre g = genreRepository.findById(id).get();
        model.addAttribute("genre", g);
        model.addAttribute("header","Janr redaktesi");

        return "save-genre";
    }
    
    

	
}
