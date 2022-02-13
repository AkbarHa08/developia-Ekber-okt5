package az.developia.crmokt5akbarhabibullayev.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Nationality {
	
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

}
