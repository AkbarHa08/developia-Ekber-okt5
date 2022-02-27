package az.developia.crmokt5akbarhabibullayev.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import az.developia.crmokt5akbarhabibullayev.model.Ticket;
import az.developia.crmokt5akbarhabibullayev.repository.TicketRepository;
import az.developia.crmokt5akbarhabibullayev.validation.MyValidationException;

@RestController
@RequestMapping(path = "/tickets")
@CrossOrigin(origins = "*")
public class TicketRestController {
	
	@Autowired
	private TicketRepository ticketRepository;
	
	@PostMapping
	public Ticket saveTicket(@Valid @RequestBody Ticket ticket, BindingResult bindingResult) {
		
		if(bindingResult.hasErrors()) {
			throw new MyValidationException(bindingResult);
		} 
		Ticket savedTicket = ticketRepository.save(ticket);
		return savedTicket;
		
	}

}
