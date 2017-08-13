import React from 'react';
import ReactDOM from 'react-dom';
import { InfiniteLoader, List, AutoSizer, WindowScroller  } from 'react-virtualized'; 
import map from "lodash/map";
import axios from "axios";
import MediaCard from "./../MediaCard/MediaCard";


// This example assumes you have a way to know/load this information
const remoteRowCount = 50;

 
export default class InfiniteForm extends React.Component{
 
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
        return(

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
           
        );
    }
}