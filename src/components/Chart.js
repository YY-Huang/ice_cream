import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear } from 'd3';
import '../styles/Chart.css';
import findMax from './../utils/findMax'


const Chart = () => {
    const [currIndex, setCurrIndex] = useState([0]);
    const simulationData = useSelector(state => state.dataReducer.data);
    const simulationIndex = simulationData ? simulationData[currIndex] : null;
    const simulRef = useRef();

    const handleChange = e => {
        setCurrIndex(e.target.value);
    };

    useEffect(() => {
        const svg = select(simulRef.current);
        svg.selectAll("path").remove()
        
        if (simulationIndex) {
            const arrivalTimes = simulationIndex.map((customer) => customer.arrivalTime);
            const averageArrivalTime = simulationIndex.map((customer) => customer.averageArrivalTime);
            const coneMakingTime = simulationIndex.map((customer) => customer.coneMakingTime);
            const averageWaitTime = simulationIndex.map((customer) => customer.averageWait);

            const maxMinutes = findMax(averageWaitTime) > findMax(averageArrivalTime) ? findMax(averageWaitTime) : findMax(averageArrivalTime)
            
            // Domain - Scale up or down, scaling index values
            // Visual representation of the values
            const xScale = scaleLinear()
              .domain([0, arrivalTimes.length - 1]) // scale index values
              .range([0, 1400]) 

            const yScale = scaleLinear()
            .domain([-1, maxMinutes + 1]) // 0 to max values in Arr
            .range([1150, 0]) // pixels high to 0
    
            const xAxis = axisBottom(xScale)
              .ticks(arrivalTimes.length)
              .tickFormat(index => index + 1)
                // .scale(xScale)
            svg.selectAll(".simul-x-axis")
              .style("transform", "translateY(1150px)")
              .call(xAxis);
    
            const yAxis = axisRight(yScale)
                // .scale(yScale)
            svg.selectAll(".simul-y-axis")
              .style("transform", "translateX(1400px)")
              .call(yAxis);

            const averageArrivalTimeLine = line()
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal);

            const coneMakingLine = line()
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal);

            const averageWaitingTimeLine = line()
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal);

            svg.selectAll(".averageArrivalTime")
            .data([averageArrivalTime])
            .join("path")
            .attr("class", "line")
            .attr("d", averageArrivalTimeLine)
            .attr("fill", "none")
            .attr("stroke", "green");

            svg.selectAll(".coneMakingTime")
            .data([coneMakingTime])
            .join("path")
            .attr("class", "line")
            .attr("d", coneMakingLine)
            .attr("fill", "none")
            .attr("stroke","purple");

            svg.selectAll(".averageWaitTime")
            .data([averageWaitTime])
            .join("path")
            .attr("class", "line")
            .attr("d", averageWaitingTimeLine)
            .attr("fill", "none")
            .attr("stroke", "red");
        }
    }, [simulationData, simulRef])

  return (
    <div>
        <br />
        <br />
        <label for="simulation-index">Simulation Index Number</label>
        <input type="number" onChange={handleChange} value={currIndex}/>
        <br />
        <svg ref={simulRef}>
            <g className="simul-x-axis" />
            <g className="simul-y-axis" />
        </svg>
    </div>
  );
}

export default Chart;