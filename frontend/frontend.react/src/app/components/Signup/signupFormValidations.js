
import Validator from "validator"; 

export const validateErrorsOnSignupForm = (values) => {
    let errors = {};

    if(!values.username){
        errors.username="Username is required.";
    }

    if(!values.email){
        errors.email="Email is required.";
    }
    else{ 
        if(!Validator.isEmail(values.email)){
            errors.email = "Email is not valid.";
        }
    }

        if(!values.password){
            errors.password="Password is required.";
        }

        if(!values.passwordConfirmation){
            errors.passwordConfirmation="Password confirmation is required.";
        }
        else{
            if(values.password){
                if(!Validator.equals(values.password, values.passwordConfirmation)){
                    errors.passwordConfirmation="Passwords must match.";
                }
            }
            
        }

        
  
        //TODO: more validations

        return errors;  
}

export const validateWarningsOnSignupForm = values => {
  const warnings = {}
  if (values.password && values.password.length<3) {
    warnings.password = 'Password to short'
  }
  return warnings
}
