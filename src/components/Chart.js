import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { scaleLinear } from 'd3-scale';
// import  * as d3 from 'd3';
import { select, line, curveCardinal } from 'd3';
// import { d3-axis } from 'd3-axis';


const Chart = () => {
    /* const simulationData = useSelector(state => {
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
    }); */

    // const [myState, setMyState] = useState(simulationData)

    const [testData, setTestData] = useState([25, 30, 45, 60, 20])

    const svgRef = useRef();

    // Will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);
        const myLine = line()
            .x((value, index) => index*50)
            .y(value => 150 - value)
            .curve(curveCardinal);
        /* svg
          .selectAll("circle")
          .data(testData)
          .join(
              "circle"
            // enter => 
            //   enter.append("circle")
               //.attr("class", "new"),
            // update => 
            //   update.attr("class", "updated"),
            // exit => exit.remove()
          )
          .attr("r", value => value)
          .attr("cx", value => value * 2)
          .attr("cy", value => value * 2)
          .attr("stroke", "red"); */
          svg.selectAll("path")
          .data([testData])
          .join("path")
          .attr("d", value => myLine(value))
          .attr("fill", "none")
          .attr("stroke", "blue");
    }, [testData])

    // d3.select(d3Chart)
    //     .data(myState)

//   console.log(useSelector)
  return (
    <div>
      <div>I am a chart!</div>
      <div>This is my data:</div>
      {/* <div>{JSON.stringify(simulationData)}</div> */}
      <div id="d3Chart"></div>
      <React.Fragment>
        <svg ref={svgRef}>
            <path d="M0, 150, 100, 100, 150, 120" stroke="blue" fill="none" />
        </svg>
        <br />
        <button onClick={() => setTestData(testData.map(value => value + 5))}>
          Update Data
        </button>
        <button onClick={() => setTestData(testData.filter(value => value < 35))}>
          Filter Data
        </button>
      </React.Fragment>
    </div>
  );
}

export default Chart;