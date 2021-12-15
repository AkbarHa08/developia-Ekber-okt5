package az.developia.springoktyabr5project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    
    @GetMapping(path= {"/","/home","/header"})
    public String showHome() {
    	return "home";
    }

}
