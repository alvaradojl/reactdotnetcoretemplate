import React from "react";
import { LinearProgress } from 'material-ui/Progress'; 
 import { withStyles, createStyleSheet } from 'material-ui/styles';
 import { connect } from "react-redux";
 import PropTypes from "prop-types";

 
const styleSheet = createStyleSheet(theme => ({
  root:{ 
    height:"5px",
    width:"100%",
    margin: "0px",
    padding:"0px",
  },
    progress: {
    margin: "0px",
    padding:"0px",
    height:"3px"
  }
}));

class TopProgress extends React.Component{

constructor(props){
    super(props);
}

    render(){

        var hidden = !this.props.isLoading;

const { classes } = this.props;

        return (
          <div className={classes.root}>
            <LinearProgress hidden={hidden} className={classes.progress} /> 
         </div>
        );
    }
}

TopProgress.propTypes = {
    classes : PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return{
        isLoading:state.isLoading
    }
}


let StyledTopProgress = withStyles(styleSheet)(TopProgress);

export default connect(mapStateToProps)(StyledTopProgress);