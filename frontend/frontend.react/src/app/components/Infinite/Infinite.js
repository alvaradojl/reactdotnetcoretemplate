import React from 'react';
import ReactDOM from 'react-dom';
import { InfiniteLoader, List } from 'react-virtualized'; 
import map from "lodash/map";
import axios from "axios";

// This example assumes you have a way to know/load this information
const remoteRowCount = 50;

const list = [];

 const results = {};

function isRowLoaded ({ index }) {
  return !!list[index];
}

 function loadMoreRows ({ startIndex, stopIndex }) {

  axios.get(`http://localhost:5000/api/events/random?startIndex=${startIndex}&stopIndex=${stopIndex}`)
        .then(response => {
            map(response.data, (item) => { 
              list.push(<span>{item.id}</span>);
            });
          
        });
 }

 function rowRenderer ({ key, index, style}) {
  return (
    <div  key={key}  style={style}>
      {list[index]}
        <br/>
     
    </div>
  )
}


export default class Infinite extends React.Component{
 
    render(){ 
        return(

            <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={remoteRowCount}>
                    {({ onRowsRendered, registerChild }) => (
                    <List
                        height={200}
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                        rowCount={remoteRowCount}
                        rowHeight={20}
                        rowRenderer={rowRenderer}
                        width={300}
                    />
                    )}
            </InfiniteLoader>
        );
    }
}