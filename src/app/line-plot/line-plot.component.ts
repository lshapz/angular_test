import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import $ from 'jquery';

@Component({
  selector: 'app-line-plot',
  templateUrl: './line-plot.component.html',
  styleUrls: ['./line-plot.component.css']
})
export class LinePlotComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() propID = 'line';
  @Input() data: [{date: string, value: number}];
  @Input() title: string;
  @Input() color = "#000";
  @Input() yAxisLabel = 'Value';
  @Input() xAxisLabel = 'Date';

  constructor() { }

  // you might need a method like this to reformat given data with the appropriate field names,
  // get dataModel() {
  //   return this.data.map(item => {
  //     return {date: item.something, value: item.somethingElse};
  //   });
  // }

  ngOnInit() {
    this.drawLinePlot(this.data, "#" + this.propID, this.color);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.drawLinePlot(this.data, "#" + this.propID, this.color);
  }

  ngAfterViewInit() {
    this.drawLinePlot(this.data, "#" + this.propID, this.color);
  }

  drawLinePlot(dataArray, selection_string, color) {
    const localThis = this;

    d3.selectAll(`.${this.propID}_tooltip`).remove();

    if ($(selection_string + " svg") != null) {
      $(selection_string + " svg").remove();
    }
    // make copy of the original data so we do not mutate it
    const data = [];
    dataArray.forEach(el => data.push(Object.assign({}, el)));

    const parseDate = d3.timeParse('%Y-%m-%d');
    const formatDate = d3.timeFormat('%B %-d %Y');
    // https://github.com/d3/d3-time-format to change how this is formatted - leave the parseDate because that's for sorting the data

    if (typeof data[0].date === 'string') {
      data.forEach(function(d) {
        d.date = parseDate(d.date);
      });
    }

    data.sort(function(a, b) {
      return a.date - b.date;
    });

    const detected_percent =
      d3.max(data, function(d) {
        return d.value;
      }) <= 1
        ? true
        : false;
    const element = $(selection_string);

    let margin = { top: 20, right: 30, bottom: 45, left: 40 },
      width = $(element).width() - margin.left - margin.right,
      height = $(element).height() - margin.top - margin.bottom;

    // Account for panel heading height if the title exists.
    if (this.title) {
      height -= 40;
    }

    let xValue = function(d) {
        return d.date;
      },
      xScale = d3.scaleTime().range([0, width - margin.right]),
      xMap = function(d) {
        return xScale(xValue(d));
      },
      xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSizeInner(-height)
        .ticks(6);
    let format_attribute;
    if (detected_percent) {
      format_attribute = d3.format("%");
    } else {
      format_attribute = d3.format("");
    }

    let yValue = function(d) {
        return d.value;
      },
      yScale = d3.scaleLinear().range([height, 0]),
      yMap = function(d) {
        return yScale(yValue(d));
      };

    xScale.domain(d3.extent(data, xValue));
    yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);

    let yAxis = d3.axisLeft()
      .scale(yScale)
      .tickSizeInner(-width)
      .ticks(4)
      .tickFormat(format_attribute);

    let line = d3.line()
      .x(xMap)
      .y(yMap);

    let svg = d3
      .select(selection_string)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let tooltip = d3
      .select("body")
      .append("div")
      .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
      .style("opacity", 0);

    svg.style("fill", "transparent")
    svg
      .append("g")
      .attr("class", "x axis xaxis axis-line-plot1")
      .attr("transform", "translate(0," + height + ")")
      .style('fill', 'black')
      .style("font-size", "14px")
      .call(xAxis)
      .append("text")
      .attr("x", (width / 2))
      .attr("y", 25)
      .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .attr("font-size", "16px")
      .text(this.xAxisLabel);

    svg
      .append("g")
      .attr("class", "y axis axis-line-plot")
      .style("fill", "black")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .attr("font-size", "16px")
      .text(this.yAxisLabel);

    let clip_id = "clip-" + this.propID;

    svg
      .append("clipPath")
      .attr("id", clip_id)
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width > 0 ? width : 0)
      .attr("height", height > 0 ? height : 0);

    svg
      .append("rect")
      .attr("class", "pane")
      .attr("width", element.width())
      .attr("height", height)
      .attr("clip-path", "url(#" + clip_id + ")");

    svg
      .append("path")
      .datum(data)
      .attr("class", "line lineplotline")
      .attr("d", line)
      .attr("clip-path", "url(#" + clip_id + ")")
      .attr("stroke", color);

    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", 5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .attr("clip-path", "url(#" + clip_id + ")")
      .attr("fill", "black")
      .attr("opacity", 0)
      .on("mouseover", function(d) {
        tooltip
          .transition()
          .duration(100)
          .style("opacity", 1);
        tooltip
          .html(
            "Date: " + formatDate(d.date) +
              "<br>" +
              localThis.yAxisLabel +
              ": " +
              format_attribute(yValue(d))
          )
          .style("left", d3.event.pageX + 5 + "px")
          .style("top", d3.event.pageY - 28 + "px");
        d3
          .select(this)
          .transition()
          .duration(50)
          .style("fill", "black")
          .attr("opacity", 1);

      })
      .on("mouseout", function(d) {
        tooltip
          .transition()
          .duration(300)
          .style("opacity", 0);
        d3
          .select(this)
          .transition()
          .duration(50)
          .attr("opacity", 0);
      })

    svg
      .selectAll(".tick")
      .filter(function(d) {
        return d === 0;
      })
      .remove();

  }


}
