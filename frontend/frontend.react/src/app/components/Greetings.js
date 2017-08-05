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
            <div className="jumbotron">
                <h1 className="display-3">Greetings</h1>
                <p className="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, 
                    tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                </p> 
                <Button color="primary">
                {'Primary'}
                </Button>
                <Button color="accent">
                {'Accent'}
                </Button>

                <div>
      <CircularProgress className={classes.progress} />
      <CircularProgress className={classes.progress} size={50} />
      <CircularProgress color="accent" className={classes.progress} />
      <CircularProgress color="accent" className={classes.progress} size={50} />
    </div>
     <div className={classes.root}>
      <LinearProgress />
      <br />
      <LinearProgress color="accent" />
    </div>
     <div className={classes.root}>
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
      </div>
            </div>
           
        );
    }
}

Greetings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Greetings);