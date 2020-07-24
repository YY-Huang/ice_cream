import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
// import { scaleLinear } from 'd3-scale';
// import  * as d3 from 'd3';
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear } from 'd3';
// import { d3-axis } from 'd3-axis';
import '../styles/Chart.css';
import findMax from './../utils/findMax'


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
        return [data[0]]
    }); */

    const simulationData = useSelector(state => state.dataReducer.data[0])
    // console.log('simul data', simulationData.map((customer) => customer.arrivalTime))

    // const arrivalTimes = simulationData.map((customer) => customer[0].arrivalTimes)
    // console.log('arrival Times', arrivalTimes)

    const simulRef = useRef();

    useEffect(() => {
        const svg = select(simulRef.current);

        if (simulationData) {
            const arrivalTimes = simulationData.map((customer) => customer.arrivalTime)
            const averageArrivalTime = simulationData.map((customer) => customer.averageArrivalTime)
            const coneMakingTime = simulationData.map((customer) => customer.coneMakingTime)
            const averageWaitTime = simulationData.map((customer) => customer.averageWait)

            const maxMinutes = findMax(averageWaitTime)
            console.log('max is', maxMinutes)
            
            // Domain - Scale up or down, scaling index values
            // Visual representation of the values
            const xScale = scaleLinear()
              .domain([0, arrivalTimes.length - 1]) // scale index values
              .range([0, 1400]) 

            const yScale = scaleLinear()
            .domain([-1, maxMinutes]) // 0 to max values in Arr
            .range([1150, 0]) // pixels high to 0
    
            const xAxis = axisBottom(xScale)
              .ticks(arrivalTimes.length)
              .tickFormat(index => index + 1)
            svg.select(".simul-x-axis")
              .style("transform", "translateY(1150px)")
              .call(xAxis);
    
            const yAxis = axisRight(yScale)
            svg.select(".simul-y-axis")
              .style("transform", "translateX(1400px)")
              .call(yAxis);

            const myLine = line()
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal);

            svg.selectAll(".averageArrivalTime")
            .data([averageArrivalTime])
            .join("path")
            .attr("class", "line")
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke", "green");

            svg.selectAll(".coneMakingTime")
            .data([coneMakingTime])
            .join("path")
            .attr("class", "line")
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke","purple");

            svg.selectAll(".averageWaitTime")
            .data([averageWaitTime])
            .join("path")
            .attr("class", "line")
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke", "red");
        }



    }, [simulationData, simulRef])

    // const [myState, setMyState] = useState(simulationData)

    // const [testData, setTestData] = useState([25, 30, 45, 60, 20, 65, 75])

    // const svgRef = useRef();

    
    // Test Data below
    // Will be called initially and on every data change
    // useEffect(() => {
    //     const svg = select(svgRef.current);

    //     // Domain - Scale up or down, scaling index values
    //     // Visual representation of the values
    //     const xScale = scaleLinear()
    //       .domain([0, testData.length - 1])
    //       .range([0, 300])

    //     // Maps 0 values to the bottom of 150 pixels
    //     // Domain - max value is 75 at the top
    //     const yScale = scaleLinear()
    //       .domain([0,150])
    //       .range([150,0])

    //     const xAxis = axisBottom(xScale)
    //       .ticks(testData.length)
    //       .tickFormat(index => index + 1)
    //     svg.select(".x-axis")
    //       .style("transform", "translateY(150px)")
    //       .call(xAxis);

    //     const yAxis = axisRight(yScale)
    //     svg.select(".y-axis")
    //       .style("transform", "translateX(300px)")
    //       .call(yAxis);

    //     const myLine = line()
    //         .x((value, index) => xScale(index))
    //         .y(yScale)
    //         .curve(curveCardinal);
    //     /* svg
    //       .selectAll("circle")
    //       .data(testData)
    //       .join(
    //           "circle"
    //         // enter => 
    //         //   enter.append("circle")
    //            //.attr("class", "new"),
    //         // update => 
    //         //   update.attr("class", "updated"),
    //         // exit => exit.remove()
    //       )
    //       .attr("r", value => value)
    //       .attr("cx", value => value * 2)
    //       .attr("cy", value => value * 2)
    //       .attr("stroke", "red"); 
    //     */
    //       svg.selectAll(".line")
    //       .data([testData])
    //       .join("path")
    //       .attr("class", "line")
    //       .attr("d", myLine)
    //       .attr("fill", "none")
    //       .attr("stroke", "blue");
    // }, [testData])

    // d3.select(d3Chart)
    //     .data(myState)

//   console.log(useSelector)
  return (
    <div>
      <div>I am a chart!</div>
      <div>This is my data:</div>
      <div>{JSON.stringify(simulationData)}</div>
      <br />
      <React.Fragment>
        <svg ref={simulRef}>
            <g className="simul-x-axis" />
            <g className="simul-y-axis" />
        </svg>
      </React.Fragment>
      <br />
      <br />
      {/* <React.Fragment>
        <svg ref={svgRef}>
            // <path d="M0, 150, 100, 100, 150, 120" stroke="blue" fill="none" />
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
        <br />
        <button onClick={() => setTestData(testData.map(value => value + 5))}>
          Update Data
        </button>
        <button onClick={() => setTestData(testData.filter(value => value < 35))}>
          Filter Data
        </button>
      </React.Fragment> */}
    </div>
  );
}

export default Chart;