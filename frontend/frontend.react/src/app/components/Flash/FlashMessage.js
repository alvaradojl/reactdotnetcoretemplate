import React from "react";
import classnames from "classnames";
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';



const styleSheet = createStyleSheet(theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
}));


export class FlashMessage extends React.Component{


  state = {
    open: true,
    message: null,
  };


  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.deleteMessage(this.props.message.id);
    this.setState({ open: false });
  };



    render(){
          const { classes } = this.props;
        return (

 <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
         // autoHideDuration={6e3}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.message.text}</span>}
           action={[
            
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleRequestClose}
            >
              <CloseIcon />
            </IconButton>
          ]} 
        />
 
        );
    }
}

FlashMessage.propTypes = {
    message: PropTypes.object.isRequired,
    deleteMessage: PropTypes.func.isRequired,
     classes: PropTypes.object.isRequired,
}


export default withStyles(styleSheet)(FlashMessage);