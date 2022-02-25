package az.developia.crmokt5akbarhabibullayev.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.annotations.ManyToAny;

@Entity
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Min(value = 1)
	@Max(value = Integer.MAX_VALUE)
	private Integer id;
	
	@Size(min = 2, message = "Minimum 2 simvol olmalidir!")
	@Size(max = 30, message = "Maksimum 30 simvol olmalidir!")
	@NotNull(message = "Ad mutleq olmalidir")
	@NotEmpty(message = "Adi bos qoymaq olmaz")
	private String name;
	
	@Size(max = 30, message = "Maksimum 30 simvol olmalidir!")
	private String surname;
	
	@Size(min = 2, message = "Minimum 2 simvol olmalidir!")
	@Size(max = 30, message = "Maksimum 30 simvol olmalidir!")
	@NotNull(message = "Telefon mutleq olmalidir")
	@NotEmpty(message = "Telefonu bos qoymaq olmaz")
	private String phone;
	
	@Email(message = "Duzgun email unvani daxil edin!!")
	private String email;
	
	@Past(message = "Dogum tarixi mutleq kecmis zaman olmalidir!")
	private LocalDate birthday;
	
	@Size(max = 200, message = "Maksimum 200 simvol olmalidir!!!")
	private String description;
	
	@Size(min = 2, message = "Minimum 2 simvol olmalidir!")
	@Size(max = 200, message = "Maksimum 200 simvol olmalidir!")
	@NotNull(message = "Unvan mutleq olmalidir")
	@NotEmpty(message = "Unvan bos qoymaq olmaz")
	private String address;
	
	@Size(min = 4, message = "Minimum 4 simvol olmalidir!")
	@Size(max = 6, message = "Maksimum 6 simvol olmalidir!")
	@NotNull(message = "Cins mutleq olmalidir")
	@NotEmpty(message = "Cinsi bos qoymaq olmaz")
	private String gender;
	
	@Size(max = 20, message = "Maksimum 20 simvol olmalidir!!!")
	private String idNumber;
	
	@Size(max = 20, message = "Maksimum 20 simvol olmalidir!!!")
	private String idFin;
	
	@ManyToOne
	private Nationality nationality;
	
	
	
	
	public Nationality getNationality() {
		return nationality;
	}
	public void setNationality(Nationality nationality) {
		this.nationality = nationality;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public LocalDate getBirthday() {
		return birthday;
	}
	public void setBirthday(LocalDate birthday) {
		this.birthday = birthday;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getIdNumber() {
		return idNumber;
	}
	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}
	public String getIdFin() {
		return idFin;
	}
	public void setIdFin(String idFin) {
		this.idFin = idFin;
	}
	
	
	
}
