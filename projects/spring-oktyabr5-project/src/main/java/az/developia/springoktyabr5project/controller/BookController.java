package az.developia.springoktyabr5project.controller;

import az.developia.springoktyabr5project.model.Book;
import az.developia.springoktyabr5project.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;
import java.util.List;

@Controller
public class BookController {

    @Autowired
    private BookRepository bookRepository;



    @GetMapping(path="/books")
    public String showBooks(Model model) {
        List<Book> books = bookRepository.findAll();


        model.addAttribute("books", books);
        return "books";
    }

    @GetMapping(path = "/books/open/save")
    public String showSaveBooks(Model model) {
        Book b = new Book();
        model.addAttribute("book", b);

        return "save-book";
    } 
    @PostMapping(path = "/books/save")
    public String addBook(@Valid @ModelAttribute(name = "book") Book b, BindingResult result) {
        if(result.hasErrors()) {
            return "save-book";
        }

        bookRepository.save(b);

        return "redirect:/books";
    }

}
