import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const HorizontalLayout = ({
  onCircleClick,
  width_ = 800,
  height_ = 800,
  onShapeMouseOut,
  onShapeMouseOver,
}) => {
  const d3Container = useRef(null);

  const margin = { top: 10, right: 150, bottom: 10, left: 150 }; // margins added
  const width = width_ - margin.left - margin.right;
  const height = height_ - margin.top - margin.bottom;
  const circleradius = 18;
  useEffect(() => {
    if (d3Container.current) {
      d3.select(d3Container.current).selectAll("*").remove();

      const svg = d3
        .select(d3Container.current)
        .append("svg")
        .attr("width", width_) // adjusted width
        .attr("height", height_) // adjusted height
        .append("g") // Append a 'g' element to offset everything by the margins
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const defs = svg.append("defs");
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

      // Draw the horizontal line
      svg
        .append("line")
        .attr("x1", 0)
        .attr("y1", height / 2)
        .attr("x2", width)
        .attr("y2", height / 2)
        .attr("stroke", "lightgray")
        .attr("stroke-width", 10) // Set the stroke width to your desired size
        .attr("stroke-linecap", "round"); // Set the line cap style to round

      // Function to calculate circle positions
      const calculateCirclePosition = (index, total) => {
        const spacing = width / (total - 1);
        return index * spacing;
      };

      const circleData = [
        {
          label: "Website Development",
          icon: "icon1.png",
          content: "Content 1",
        },
        {
          label: "API Management",
          icon: "icon2.png",
          content: "Content 2",
        },
        {
          label: "Data Analytics & AI",
          icon: "icon3.png",
          content: "Content 3",
        },
        {
          label: "QA & Testing",
          icon: "icon4.png",
          content: "Content 4",
        },
      ];

      // Draw the four circles along with labels, icons, and content
      circleData.forEach((data, i) => {
        // Calculate circle position
        const cx = calculateCirclePosition(i, circleData.length);

        // Append circle
        const circle = svg
          .append("circle")
          .attr("cx", cx)
          .attr("cy", height / 2)
          .attr("r", circleradius)
          .attr("fill", "lightgray")
          .attr("fill-opacity", 0.75)
          .style("filter", "url(#drop-shadow)");
        // .style('transition', 'transform 0.5s ease-in-out')

        // Append label below the circle
        const text = svg
          .append("text")
          .attr("x", cx)
          .attr("y", height / 2 + 54) // Adjust y position below the circle
          .attr("text-anchor", "middle") // Center the text
          .text(data.label)
          .attr("font-weight", "bold") // Make the font bold
          .attr("font-size", "20px")
          .attr("fill", "white");
        //.style('filter', 'url(#drop-shadow)'); // You can adjust the size as needed;;

        circle.on("mouseover", function () {
          d3.select(this)
            .transition()
            .duration(500) // Duration of the transition in milliseconds
            //.attr('transform', 'scale(1.1)')
            .attr("r", circleradius * 1.8) // Increase the radius by 10% on hover
            .attr("fill", "#31a354"); // Change the fill color on mouseover

          // Increase text size
          text.transition().duration(500).attr("font-size", "24px"); // Increase the font size

          onShapeMouseOver(data.label);
        });

        circle.on("mouseout", function () {
          d3.select(this)
            .transition()
            .duration(500) // Duration of the transition in milliseconds
            //.attr('transform', 'scale(1)')
            .attr("r", circleradius) // Return the radius to original size on mouse out
            .attr("fill", "#31a354"); // Change the fill color on mouseover

          // Return text size to original
          text.transition().duration(500).attr("font-size", "20px"); // Return the font size to original

          onShapeMouseOut(data.label);
        });
      });
    }
  }, [width_, height_, onShapeMouseOut, onShapeMouseOver]);

  return <div ref={d3Container} />;
};

export default HorizontalLayout;
