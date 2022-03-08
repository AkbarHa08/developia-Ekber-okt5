package az.developia.computershoppingekberhebibullayev.validation;

import org.springframework.validation.BindingResult;

public class MyValidationException extends RuntimeException {
	
	private BindingResult bindingResult;
	
	public MyValidationException(BindingResult bindingResult) {
		this.bindingResult = bindingResult;
		
	}

	public BindingResult getBindingResult() {
		return bindingResult;
	}

	public void setBindingResult(BindingResult bindingResult) {
		this.bindingResult = bindingResult;
	}

}
