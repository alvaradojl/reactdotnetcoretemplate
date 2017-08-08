import React from "react";
import TextField from 'material-ui/TextField';
import IntegrationAutosuggest from "./../TimezoneSuggestion/TimezoneSuggestion";
import Typography from 'material-ui/Typography';
import {themePalette} from "./../../styles/MaterialUi/themePalette";

import blueGrey from "material-ui/colors/blueGrey";
import grey from "material-ui/colors/grey";

export const RenderTextField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, warning },
 ...custom
}) =>{

const textPalette = themePalette.error[500]; 
    return (  
            <div>
                   <TextField  
                    {...input} 
                    {...custom}
                    label={label}  
                    margin="normal"   
                    type={type}
                    InputProps={{ placeholder }} 
                    helperText={error && touched && error} 
                    error={error && touched}
                    fullWidth />  
                     {touched &&   
                    (warning && <Typography type="caption" style={{color:textPalette, marginLeft:"8px"}}> {warning}</Typography>)}
            </div>
    );
}

export const RenderAutosuggestion = ({
  input,
  label,
  meta: { touched, error, warning },
 ...custom
}) =>{
    return (  
            <div> 
                <IntegrationAutosuggest 
                {...input} 
                {...custom}
                label={label}  
                margin="normal"     
                helperText={error && touched && error} 
                error={error && touched}
                fullWidth />

                {touched &&   
                (warning && <Typography> {warning}</Typography>)}
            </div>
    );
}