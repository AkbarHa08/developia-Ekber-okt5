package az.developia.computershoppingekberhebibullayev.controller;

import java.lang.StackWalker.Option;
import java.util.Optional;

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
		
		return "success";
	}
	
	@PostMapping(path = "/signup")
	public User signup(@RequestBody User user) {
		
		Optional<User> userOptional = userRepository.findById(user.getUsername());
		if(userOptional.isPresent()) {
			user.setUsername("");
			return user;
		} else {
			user.setEnabled(true);
			user.setPassword("{noop}"+user.getPassword());
			User savedUser = userRepository.save(user);
			
			Authority authority = new Authority();
			authority.setUsername(user.getUsername());
			authority.setAuthority("user");
			authorityRepository.save(authority);
			
			return savedUser;
		}
		
		
		
	}
}
