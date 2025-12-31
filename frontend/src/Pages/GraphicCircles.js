import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const CircleComponent = ({ activeCircle, width, height }) => {
  const svgRef = useRef();
  const [circles, setCircles] = useState([]);

  const centerX = width / 2;
  const centerY = height / 2;
  const circleRadius = 55;
  const imageSize = circleRadius * 1.8;

  useEffect(() => {
    const initialCircles = Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      x: Math.cos(((2 * Math.PI) / 4) * i) * (width / 2.8) + centerX,
      y: Math.sin(((2 * Math.PI) / 4) * i) * (height / 2.8) + centerY,
      imageUrl: `./LandingPage_${i + 1}.png`,
    }));
    setCircles(initialCircles);
  }, [width, height]);

  const calculateUpdatedPositions = (activeCircleNum) => {
    // Calculate the angle between each circle (360 degrees / number of circles)
    const angleIncrement = (2 * Math.PI) / (circles.length - 1);
    // Constant angle shift of 30 degrees in radians
    const angleShift = Math.PI / 6;

    // This variable will store the total shift needed based on the active circle
    let totalShift = angleShift * activeCircleNum;

    return circles.map((circle) => {
      if (circle.id === activeCircleNum) {
        // Active circle goes to the center
        return { ...circle, x: centerX, y: centerY };
      } else {
        // Calculate the angle for the circle, adjusted for the active circle
        let adjustedId =
          circle.id > activeCircleNum ? circle.id - 1 : circle.id;
        let angle = angleIncrement * (adjustedId - 1) + totalShift; // Add totalShift here

        // Adjust the angle to ensure it's within the range of 0 to 2*PI
        angle = angle % (2 * Math.PI);

        return {
          ...circle,
          x: Math.cos(angle) * (width / 2.8) + centerX,
          y: Math.sin(angle) * (height / 2.8) + centerY,
        };
      }
    });
  };

  useEffect(() => {
    if (!circles.length) return;

    const updatedCircles =
      activeCircle >= 1 && activeCircle <= 4
        ? calculateUpdatedPositions(activeCircle)
        : circles;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const defs = svg.append("defs");

    //Shadow effect
    const filter = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "200%") // adjust the height if needed
      .attr("width", "200%"); // adjust the height if needed

    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 5) // adjust for blur size
      .attr("result", "blur");

    filter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 8) // X offset
      .attr("dy", 8) // Y offset
      .attr("result", "offsetBlur");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Draw lines and circles with transitions
    updatedCircles.forEach((circle) => {
      // Line
      svg
        .append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", centerX)
        .attr("y2", centerY)
        .attr("stroke", "lightgray")
        .attr("stroke-width", 6) // Set the stroke width here
        .transition()
        .duration(1000)
        .attr("x2", circle.x)
        .attr("y2", circle.y);
    });
    updatedCircles.forEach((circle) => {
      // Circle and image group
      const group = svg.append("g");

      group
        .append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", circleRadius)
        .attr("fill", "white")
        .attr("stroke", "black")
        .transition()
        .duration(1000)
        .attr("cx", circle.x)
        .attr("cy", circle.y)
        .style("filter", "url(#drop-shadow)");

      group
        .append("image")
        .attr("xlink:href", circle.imageUrl)
        .attr("x", centerX - imageSize / 2)
        .attr("y", centerY - imageSize / 2)
        .attr("height", imageSize)
        .attr("width", imageSize)
        .transition()
        .duration(1000)
        .attr("x", circle.x - imageSize / 2)
        .attr("y", circle.y - imageSize / 2);
    });
  }, [activeCircle, circles, width, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default CircleComponent;
