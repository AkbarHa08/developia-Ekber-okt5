package az.developia.computershoppingekberhebibullayev.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import az.developia.computershoppingekberhebibullayev.model.Authority;
import az.developia.computershoppingekberhebibullayev.model.User;
import az.developia.computershoppingekberhebibullayev.repository.AuthorityRepository;
import az.developia.computershoppingekberhebibullayev.repository.UserRepository;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin(origins = "*")
public class UserRestController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthorityRepository authorityRepository;
	
	@GetMapping(path = "/login")
	public String login() {
		
		return "Success";
	}
	
	@PostMapping(path = "/signup")
	public void addUser(@RequestBody User user) {
		user.setEnabled(true);
		user.setPassword("{noop}"+user.getPassword());
		userRepository.save(user);
		
		Authority authority = new Authority();
		authority.setUsername(user.getUsername());
		authority.setAuthority("user");
		authorityRepository.save(authority);
	}

}
