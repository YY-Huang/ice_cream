import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { scaleLinear } from 'd3-scale';
import * as d3 from 'd3';
// import { d3-axis } from 'd3-axis';


const Chart = () => {
    const simulationData = useSelector(state => {
        const {
            dataReducer : {
                data,
            }
        } = state;

        const totalSimulations = data.length - 1

        //  for(let i = 0; i < totalSimulations; i++) {

        //     let x = f(n);

        //     x = d3.scaleLinear()
        //         .range(d3.extent(data[i], customer => customer.arrivalTime))
        //     console.log('d3 info')
        //     console.log(x)
        //  }
        return data
    });

    const [myState, setMyState] = useState(simulationData)

    d3.select(d3Chart)
        .data(myState)

//   console.log(useSelector)
  return (
    <div>
      <div>I am a chart!</div>
      <div>This is my data:</div>
      {/* <div>{JSON.stringify(simulationData)}</div> */}
      <div id="d3Chart"></div>
    </div>
  );
}

export default Chart;