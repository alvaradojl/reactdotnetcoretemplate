import React from "react";
 import Button from "material-ui/Button";
 import { CircularProgress } from 'material-ui/Progress';
 import PropTypes from 'prop-types';
 import { withStyles, createStyleSheet } from 'material-ui/styles';
 import { LinearProgress } from 'material-ui/Progress';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import WifiIcon from 'material-ui-icons/Wifi';
import BluetoothIcon from 'material-ui-icons/Bluetooth';
import Grid from 'material-ui/Grid';


const styleSheet = createStyleSheet(theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
}));

export class Greetings extends React.Component{

  state = {
    checked: ['wifi'],
  };

  handleToggle = (event, value) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

    render(){

        const classes = this.props.classes;

        return(
             
  
    <div className={classes.container}>

                <Grid container>
                    <Grid item md={3}>
                    
                    </Grid>
                    <Grid item md={6}>
                        
                        <List subheader={<ListSubheader>Settings</ListSubheader>}>
          <ListItem>
            <ListItemIcon>
              <WifiIcon />
            </ListItemIcon>
            <ListItemText primary="Wi-Fi" />
            <ListItemSecondaryAction>
              <Switch
                onClick={event => this.handleToggle(event, 'wifi')}
                checked={this.state.checked.indexOf('wifi') !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BluetoothIcon />
            </ListItemIcon>
            <ListItemText primary="Bluetooth" />
            <ListItemSecondaryAction>
              <Switch
                onClick={event => this.handleToggle(event, 'bluetooth')}
                checked={this.state.checked.indexOf('bluetooth') !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

                    </Grid> 
                    <Grid item md={3}>
                        
                    </Grid> 
                </Grid> 
            </div>
        
           
        );
    }
}

Greetings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Greetings);