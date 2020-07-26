import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear, set } from 'd3';
import '../styles/Chart.css';
import findMax from './../utils/findMax'


const Chart = () => {
    const [currIndex, setCurrIndex] = useState(0);
    const [currAverageWaitTime, setCurrAverageWaitTime] = useState([]);
    const simulationData = useSelector(state => state.dataReducer.data);
    const simulationIndex = simulationData ? simulationData[currIndex] : null;
    const simulRef = useRef();

    const screenWidth = window.screen.width
    const screenHeight = window.screen.height

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
            setCurrAverageWaitTime(averageArrivalTime)

            const maxMinutes = findMax(averageWaitTime) > findMax(averageArrivalTime) ? findMax(averageWaitTime) : findMax(averageArrivalTime)
            
            const width = screenWidth * .8
            const height = screenHeight * .8

            svg
              .attr("width", width)
              .attr("height", height)

            // Domain - Scale up or down, scaling index values
            // Visual representation of the values
            const xScale = scaleLinear()
              .domain([0, arrivalTimes.length - 1]) // scale index values
              .range([0, width]) 

            const yScale = scaleLinear()
            .domain([-1, maxMinutes + 1]) // -1 to max values in Arr
            .range([height, 0]) // pixels high to 0
    
            const xAxis = axisBottom(xScale)
              .ticks(arrivalTimes.length)
              .tickFormat(index => index + 1)
                // .scale(xScale)
            svg.selectAll(".simul-x-axis")
              .style("transform", `transateY(${height + 10}px)`)
              .call(xAxis);
    
            const yAxis = axisRight(yScale)
                // .scale(yScale)
            svg.selectAll(".simul-y-axis")
              .style("transform", `translateX(${width + 10}px)`)
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
    }, [simulationData, simulRef, simulationIndex])

    useEffect(() => {
        setCurrIndex(0)
    }, [simulationData])

    return (simulationData && simulationData.length) ? (
        <div className="chart">
            <br />
            <br />
                <form className="simulation-form">
                    <label htmlFor="simulation-index">Simulation Index Number</label>
                    <input type="number" onChange={handleChange} value={currIndex} />
                </form>

                { currAverageWaitTime.length && 
                  <p>THe last customer in this simulation will need to wait {currAverageWaitTime[currAverageWaitTime.length-1].toFixed(2)} minutes to be served</p>
                }
                <br />
                <svg ref="{simulRef}">
                <g className="simul-x-axis" />
                <g className="simul-x-axis" />
                </svg>
                <span className="y-label">
                    Minutes
                </span>
                <span className="x-label">
                    Ticket Number
                </span>
        </div>
    ) : null
}

export default Chart;