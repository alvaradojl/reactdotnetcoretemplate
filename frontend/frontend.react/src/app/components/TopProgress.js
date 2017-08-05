import React from "react";
import { LinearProgress } from 'material-ui/Progress'; 
 import { withStyles, createStyleSheet } from 'material-ui/styles';
 import { connect } from "react-redux";

 
const styleSheet = createStyleSheet(theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
}));

export class TopProgress extends React.Component{

constructor(props){
    super(props);
}

    render(){

        var hidden = !this.props.isLoading;

const { classes } = this.props;

        return (
            <div hidden={hidden}>
                  <LinearProgress /> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        isLoading:state.isLoading
    }
}

export default connect(mapStateToProps)(TopProgress);