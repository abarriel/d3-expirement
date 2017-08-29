import React, { Component } from 'react';
import d3 from 'd3';
import './App.css';

class App extends Component {

  state = {
    margin: {top: 20, right: 20, bottom: 30, left: 50},
    width: 960 - this.margin.left - this.margin.right,
    height: 500 - this.margin.top - this.margin.bottom,
    x: null,
    y: null,
    parseTime: null,
  }
  
  componentWillMount() {
    const { width, height } = this.state; 
    this.setState({ x: d3.scaleTime().range([0, width])});
    this.setState({ y: d3.scaleLinear().range([height, 0])});
    this.setState({ parseTime: d3.timeParse("%d-%b-%y") });
    x.domain([0, 1000]);
    y.domain([0, 1000]);
}

  valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

  valueline2 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.open); });

  svg = d3.select("this.rootNode")
      .attr("width", this.state.width + this.state.margin.left + this.state.margin.right)
      .attr("height", this.state.height + this.state.margin.top + this.state.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.state.margin.left + "," + this.state.margin.top + ")");
    
  // constructor(props) {
  //   super(props);
  //   this.margin = {top: 20, right: 80, bottom: 30, left: 50};
  //   this.width = svg.attr("width") - margin.left - margin.right;
  //   this.height = svg.attr("height") - margin.top - margin.bottom;
  // }

  // createBarChar() {
  //   const node = 
  // }

   render() {
    // only start drawing (accessing the DOM) after the first render, once we get hold on the ref of the node
    if (this.rootNode) {
      this.drawLineChart();
    }
    else {
      // setTimeout necessary for the very first draw, to ensure drawing using a DOMNode and prevent the following error:
      // "Uncaught TypeError: Cannot read property 'ownerDocument' of null"
      setTimeout(() => this.drawLineChart(), 0);
    }

    return (
      <svg ref={(node) => this.rootNode = node} />
    );
  }
}

export default App;
