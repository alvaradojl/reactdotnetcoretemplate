import React from "react";
import PropTypes from "prop-types";

import { createStyleSheet } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';

import Drawer from 'material-ui/Drawer'; 
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Link, NavLink, Redirect } from "react-router-dom";
import Button from 'material-ui/Button';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send'; 
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import MailIcon from 'material-ui-icons/Mail';
import HomeIcon from "material-ui-icons/Home";
import HistoryIcon from "material-ui-icons/History";
import FingerprintIcon from "material-ui-icons/Fingerprint";
import ExploreIcon from "material-ui-icons/Explore";
import LanguageIcon from "material-ui-icons/Language";
import SettingsIcon from "material-ui-icons/Settings";
import SettingsEthernetIcon from "material-ui-icons/SettingsEthernet";
import UpdateIcon from "material-ui-icons/Update";
import VerifiedUserIcon from "material-ui-icons/VerifiedUser";
import FlagIcon from "material-ui-icons/Flag";
import CallMadeIcon from "material-ui-icons/callMade";
import CallReceivedIcon from "material-ui-icons/callReceived";
import AccountCircleIcon from "material-ui-icons/AccountCircle";
import FeedbackIcon from "material-ui-icons/Feedback";
import HelpIcon from "material-ui-icons/Help";

const styleSheet = createStyleSheet({
 list: {
    width: 250,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
  menuitem:{
    textDecoration:"none"
  }
});

const firstSectionListItems = (
      <div>
        
          
        <Link style={{  textDecoration:"none"}} to="/">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" /> 
          </ListItem>
        </Link>
           
       
      
        <Link style={{  textDecoration:"none"}} to="/greetings">
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItem>
        </Link>
         <Link style={{  textDecoration:"none"}} to="/signup">
        <ListItem button>
          <ListItemIcon>
            <CallMadeIcon />
          </ListItemIcon>
          <ListItemText primary="Pending Requests Received" />
        </ListItem>
        </Link>
         <Link style={{  textDecoration:"none"}} to="/events">
        <ListItem button>
          <ListItemIcon>
            <CallReceivedIcon />
          </ListItemIcon>
          <ListItemText primary="Pending Requests Sent" />
        </ListItem>
        </Link>
         <Link style={{  textDecoration:"none"}} to="/infinite">
        <ListItem button>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
        </Link>
      </div>
    );

const secondSectionListItems = (
      <div>
       <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Account Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Application Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary="Regional Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsEthernetIcon />
          </ListItemIcon>
          <ListItemText primary="Network Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FeedbackIcon />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>
      </div>
    );

export class SideMenu extends React.Component {

  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps){
    //this.setState({open:nextProps.open});
  }

  componentWillUpdate(nextProps, nextState) {
   
   // console.log("props received in side menu: " + JSON.stringify(nextProps));
   //  console.log("state received in side menu: " + JSON.stringify(nextState));
  // nextState = {open:nextProps.open};
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("props updated in side menu: " + JSON.stringify(prevProps));
    //  console.log("state updated in side menu: " + JSON.stringify(prevState));
  }

  render(){

    const { classes } = this.props;

    return(
           <div>
                <List className={classes.list} disablePadding>
                  {firstSectionListItems}
                </List>
                <Divider />
                <List className={classes.list} disablePadding>
                  {secondSectionListItems}
                </List>
           </div>
        );
  }
}

SideMenu.propTypes = { 
    classes: PropTypes.object.isRequired 
}

export default withStyles(styleSheet)(SideMenu);