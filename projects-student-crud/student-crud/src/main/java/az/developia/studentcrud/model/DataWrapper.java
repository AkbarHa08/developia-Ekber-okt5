package az.developia.studentcrud.model;

import java.util.List;

public class DataWrapper {

	private List<ErrorResponse> validations;

	public List<ErrorResponse> getValidations() {
		return validations;
	}

	public void setValidations(List<ErrorResponse> validations) {
		this.validations = validations;
	}
}
