import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import ExploreIcon from 'material-ui-icons/Explore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import SettingsIcon from 'material-ui-icons/Settings';
import HomeIcon from 'material-ui-icons/Home';
import Typography from 'material-ui/Typography';


const styleSheet = createStyleSheet(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export class Footer extends React.Component{
 state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const classes = this.props.classes;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        {/* <BottomNavigation value={value} onChange={this.handleChange} showLabels  >
            <BottomNavigationButton label="Home" icon={<HomeIcon />} />
            <BottomNavigationButton label="Explore" icon={<ExploreIcon />} />
            <BottomNavigationButton label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationButton label="Nearby" icon={<LocationOnIcon />} />
            <BottomNavigationButton label="Settings" icon={<SettingsIcon />} />          
        </BottomNavigation> */}
        <br/>
        <Typography  type="caption" gutterBottom align="center">
          &copy;2017 Jorge Alvarado
        </Typography>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Footer);