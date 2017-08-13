import React from 'react';
import ReactDOM from 'react-dom';
import { InfiniteLoader, List, AutoSizer, WindowScroller  } from 'react-virtualized'; 
import map from "lodash/map";
import axios from "axios";
import MediaCard from "./../MediaCard/MediaCard";
import Grid from 'material-ui/Grid'; 
import styleSheet from "./styleSheet";
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

// This example assumes you have a way to know/load this information
const remoteRowCount = 50;

 
class InfiniteForm extends React.Component{
 
constructor(props){
    super(props);
    this.state ={
        list:[]
    }
   this.isRowLoaded = this.isRowLoaded.bind(this);
   this.loadMoreRows = this.loadMoreRows.bind(this);
   this.rowRenderer = this.rowRenderer.bind(this);
}


isRowLoaded ({ index }) {
    console.log(`is row ${index} loaded:` + !!this.state.list[index]);
    return !!this.state.list[index];
}

 loadMoreRows ({ startIndex, stopIndex }) {
    console.log(`loading from ${startIndex} to ${stopIndex}`);
    axios.get(`http://localhost:5000/api/events/random?startIndex=${startIndex}&stopIndex=${stopIndex}`)
        .then(response => {

            let previousList = this.state.list;

            map(response.data, (item) => {  
                    previousList.push({
                        fullName: item.fullName,
                        id:item.id, 
                        pictureUrl:item.pictureUrl
                    });
                     
            });
 
            this.setState({...this.state, list:previousList});
        });
}

rowRenderer ({ key, index, style}) {

let item = this.state.list[index];

  return (
    <div  key={key}  style={style}> 
            <MediaCard title={`${index}: ${item.fullName}`} content={item.id} imageSource={item.pictureUrl} />
        <br/>
     
    </div>
  )
}

componentDidMount(){
  
    axios.get("http://localhost:5000/api/events/random?startIndex=0&stopIndex=4")
        .then(response => 
            {
                let previousList = this.state.list;

                map(response.data, (item) => { 
 
                    previousList.push({
                        fullName: item.fullName,
                        id:item.id, 
                        pictureUrl:item.pictureUrl
                    }); 
                });  

                this.setState({...this.state, list:previousList});

            }
        );

}

    render(){ 
          const { classes } = this.props;

        return(
 
        <Grid container className={classes.container}>
            <Grid item md={3}>

            </Grid>
            <Grid item md={6}> 
                <Typography type="display2" gutterBottom>
                    Newsfeed
                </Typography>

                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.loadMoreRows}
                    rowCount={remoteRowCount}
                    minimumBatchSize={5}
                    threshold={5}>
                        {({ onRowsRendered, registerChild }) => (
                            <WindowScroller>
                                {({ height, isScrolling, scrollTop }) => (
                                    <AutoSizer disableHeight >
                                        {({ width }) => (
                                            <List
                                                autoHeight 
                                                height={height}
                                                onRowsRendered={onRowsRendered}
                                                ref={registerChild}
                                                rowCount={this.state.list.length}
                                                rowHeight={160}
                                                rowRenderer={this.rowRenderer}
                                                width={width}
                                                scrollTop={scrollTop}
                                            />
                                        )}
                                    </AutoSizer>
                                )}
                            </WindowScroller>
                        )}
                </InfiniteLoader>
 
            <Grid container className={classes.root}>
                <Grid item md={12}>
                    <Grid
                        container
                        className={classes.demo}
                        align="center"
                        direction="row"
                        justify="center">

                            {/* <Button 
                            type="submit" 
                            raised 
                            disabled={pristine || submitting || this.state.isLoading}
                            color="accent" 
                            className={classes.button}
                            style = {{  
                            width:'100px'    
                            }}>
                            Login
                            </Button> */}


                    </Grid>
                </Grid>
            </Grid>
         
        </Grid>
        <Grid item md={3}>
            
        </Grid>
    </Grid>


         
           
        );
    }
}


InfiniteForm.propTypes = { 
    classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(InfiniteForm);