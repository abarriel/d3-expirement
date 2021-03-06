import React from 'react';

import ColorHash from 'color-hash';

import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';

const colorHash = new ColorHash();

export default class StaticMultiLineChart extends React.Component {
  static defaultProps = {
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    },
    minX: 1816,
    maxX: 2011,
    minY: 23.1464,
    maxY: 82.2,
    width: 700,
    height: 400,
  }

  componentWillUpdate() {
    while (this.rootNode.firstChild) {
      this.rootNode.removeChild(this.rootNode.firstChild);
    }
  }

  drawLineChart() {
    const { margin, width: widthIncludingMargins, height: heightIncludingMargins, data, minX, maxX, minY, maxY } = this.props;
    console.log('margin', margin, minX, maxX, minY, maxY, 'data', data);
    // we are drawing the chart just like in regular d3 - querying the DOM, adding element
    // we don't care about jsx, we redraw at each change
    // that way, we could copy/paste any example from bl.ocks.org ...
    // this isn't the best approach though
    const width = widthIncludingMargins - margin.left - margin.right;
    const height = heightIncludingMargins - margin.top - margin.bottom;
    console.log('width', width, 'height', height);
    // set the ranges
    const x = scaleLinear().range([0, width]);
    const y = scaleLinear().range([height, 0]);

    // define line getter
    const valueLine = line()
      .x(d => x(d.x))
      .y(d => y(d.y));

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = select(this.rootNode)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        `translate(${margin.left},${margin.top})`);
    // Scale the range of the data
    x.domain([minX, maxX]);
    y.domain([0, maxY]);

    Object.keys(data).forEach(countryName => {
      svg.append('path')
        .data([data[countryName]])
        .style('fill', 'none')
        .style('stroke-width', '2px')
        .style('stroke', colorHash.hex(countryName))
        .attr('d', valueLine);
    });

    // Add the X Axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(axisBottom(x).ticks(width > 500 ? Math.floor(width / 80) : 4)); // prevent from having too much ticks on small screens

    // Add the Y Axis
    svg.append('g')
      .call(axisLeft(y));
  }

  render() {
    if (this.rootNode) this.drawLineChart();
    else setTimeout(() => this.drawLineChart(), 0);
    return (
      <svg ref={(node) => this.rootNode = node} />
    );
  }

}