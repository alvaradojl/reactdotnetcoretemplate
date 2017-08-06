import React from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "./../../actions/AuthActions"; 
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu'; 


const styleSheet = createStyleSheet({
  root: {
    marginTop: 5,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});

class Header extends React.Component {

 
    onClick(e){ 

        this.props.logout();
        this.context.router.history.push("/"); 
    }
 
    render(){
        const classes = this.props.classes;
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
         
              <div>
            <Button color="contrast" className={classes.button}  href="/events" >
                Events   
            </Button>

            <Button  color="contrast" className={classes.button} onClick={this.onClick.bind(this)} >
                Logout 
            </Button>
                  
         </div>


        );

        const guestLinks = (
          <div>
            <Button color="contrast" className={classes.button}  href="/signup" >
                Sign up    
            </Button>

            <Button  color="contrast" className={classes.button}  href="/login">
                Login 
            </Button>
                  
         </div>
        );

        return(
                <div className={classes.root}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            {/* <IconButton color="contrast" aria-label="Menu">
                                <MenuIcon />
                            </IconButton> */}
                            <Typography type="title" color="inherit" className={classes.flex}>
                                My React App
                            </Typography>
                        
                                { isAuthenticated ? userLinks : guestLinks }
                        </Toolbar>
                    </AppBar>
                </div> 
        );
    }
}

Header.propTypes = {
    auth:PropTypes.object.isRequired,
    logout : PropTypes.func.isRequired, 
}

Header.contextTypes = {
    router: PropTypes.object.isRequired
}

let StyledHeader = withStyles(styleSheet)(Header);

// StyledHeader.propTypes = { 
//     classes: PropTypes.object.isRequired,
// }

 
function mapStateToProps(state){
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(StyledHeader);