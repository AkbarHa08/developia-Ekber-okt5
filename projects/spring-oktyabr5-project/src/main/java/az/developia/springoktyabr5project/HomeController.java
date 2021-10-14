package az.developia.springoktyabr5project;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping
    public String home(){
        return "home";
    }

    @GetMapping(path = "/home")
    public String backHome(){
        return "home";
    }

}
