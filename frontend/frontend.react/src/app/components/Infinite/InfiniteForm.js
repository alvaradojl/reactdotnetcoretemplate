import React from 'react';
import ReactDOM from 'react-dom';
import { InfiniteLoader, List, AutoSizer, WindowScroller  } from 'react-virtualized'; 
import map from "lodash/map";
import axios from "axios";
import MediaCard from "./../MediaCard/MediaCard";


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
              list.push(<MediaCard title={item.fullName} content={item.id} imageSource={item.pictureUrl} />);
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
 
export default class InfiniteForm extends React.Component{
 
    render(){ 
        return(

            <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={remoteRowCount}
                threshold={10}>
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
                                            rowCount={remoteRowCount}
                                            rowHeight={160}
                                            rowRenderer={rowRenderer}
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