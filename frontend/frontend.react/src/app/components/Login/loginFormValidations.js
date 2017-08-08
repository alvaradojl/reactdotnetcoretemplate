
 export const validateErrorsOnLoginForm = (values) => {
    let errors = {};

    if(!values.identifier){
        errors.identifier="identifier is required.";
    }

    if(!values.password){
        errors.password="password is required.";
    }

    return errors;
}

export const validateWarningsOnLoginForm = values => {
  const warnings = {}
  if (values.password && values.password.length<3) {
    warnings.password = 'Password to short'
  }
  return warnings
}
