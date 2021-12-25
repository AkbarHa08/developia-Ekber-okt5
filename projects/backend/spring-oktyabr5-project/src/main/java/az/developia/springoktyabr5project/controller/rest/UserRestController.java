package az.developia.springoktyabr5project.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import az.developia.springoktyabr5project.model.Authority;
import az.developia.springoktyabr5project.model.User;
import az.developia.springoktyabr5project.repository.AuthorityRepository;
import az.developia.springoktyabr5project.repository.UserRepository;

@RestController
@RequestMapping(path = "/users/rest")
@CrossOrigin(origins = "*")
public class UserRestController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthorityRepository authorityRepository;

	@GetMapping(path="/login")
	public String login(){
		
		
		return "success";
	}
	
	@PostMapping(path="/signup")
	public void addUser(@RequestBody User user) {
		user.setEnabled(true);
		user.setPassword("{noop}"+user.getPassword());
		userRepository.save(user);
		
		Authority authority=new Authority();
		authority.setUsername(user.getUsername());
		authority.setAuthority("reader");
		authorityRepository.save(authority);
		
	}
}
