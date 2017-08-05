import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEvent } from "./../../actions/EventsActions";
import mystore from "./../../store"; 
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button'; 

const styleSheet = createStyleSheet(theme => ({
  container: {
     flexGrow: 1,
      marginTop: 30,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  } 
}));

export class EventsForm extends React.Component{
      constructor(props){
        super(props);
        this.state = {
            description:"", 
            errors:{},
            isLoading:false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({errors:{}, isLoading:true});
        
        let newEvent = {
            description : this.state.description, 
        }

       mystore.dispatch({type:"TOGGLE_LOADING", status: true});

        mystore.dispatch(addEvent(newEvent))
        .then((response) =>{
            console.log(JSON.stringify(response.data));
            mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"success", text:"A new event has been added"}});
            this.setState({errors:{}, isLoading:false}); 
              mystore.dispatch({type:"TOGGLE_LOADING", status: false});

        }).catch(
            (result) =>{
                  mystore.dispatch({type:"TOGGLE_LOADING", status: false});
                if(result.response.status==401){
                mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"Please login "}});

                    this.context.router.history.push("/login");
                }
                else{
                    this.setState({errors:{}, isLoading:false}); 
                    mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"An error ocurred while attempting to create an event."}});
                    console.log(JSON.stringify(result));
                }
               
            }
        );
 
    }

    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }


    render(){

        const { classes } = this.props;

        const { description, isLoading }  = this.state;

        return(
                 <div className={classes.container}>

            <Grid container gutter={24}>
                <Grid item md={3}>
                  
                </Grid>
                <Grid item md={6}> 
                     <Typography type="display2" gutterBottom>
                        Login
                    </Typography>
                     <form onSubmit={this.onSubmit}>
             
                   
                        <TextField
                            required
                            id="description"
                            name="description"
                            label="Description"
                            className={classes.textField}
                            value={this.state.identifier} 
                            onChange={this.onChange} 
                            margin="normal"
                            helperText="Description of the event"
                            InputProps={{ placeholder: 'some description' }}
                            fullWidth
                        />
                        <br/>

               <br/>
                        <Button type="submit" disabled={this.state.isLoading}  color="accent" className={classes.button}>Add Event</Button>
                    
 
 
            </form>
             </Grid>
             <Grid item md={3}>
                  
                </Grid>
            </Grid>
            </div>
        );
    }
}
 
EventsForm.contextTypes = {
    router : PropTypes.object.isRequired
}

EventsForm.propTypes = {
      classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>{
    return {
        messages:state.messages, 
        events:state.events,
        isLoading:state.isLoading 
    }
} 

export default connect(mapStateToProps, {})(withStyles(styleSheet)(EventsForm));