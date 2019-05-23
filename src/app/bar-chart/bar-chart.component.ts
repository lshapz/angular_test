import { Component, Input, OnChanges, SimpleChanges, AfterViewInit} from '@angular/core';
import * as d3 from 'd3';
import $ from 'jquery';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges, AfterViewInit {
  @Input() data: [{name: string, value: number}];
  @Input() propID = 'fob';
  yAxisLabel = 'y';
  xAxisLabel = 'x';
  xAxisAngle = 45;
  yAxisAngle = 45;
  constructor() { }

  get dataModel() {
    return this.data.map(item => {
      return {x: item.name, y: item.value};
    });
  }

  ngAfterViewInit() {
    this.drawBarPlot(this.dataModel, this.propID, this.yAxisLabel, this.xAxisLabel, this.mouseover_callback);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.drawBarPlot(this.dataModel, this.propID, this.yAxisLabel, this.xAxisLabel, this.mouseover_callback);
  }

  mouseover_callback(x) {
      return x;
  }

  drawBarPlot (data, id, yaxisvalue, xaxisvalue, mouseover_callback) {
        const localThis = this;
        d3.selectAll(`.${this.propID}_tooltip`).remove();
        // const selection_string = "#" + id;
        // if ($(selection_string + " svg") != null) {
        //   $(selection_string + " svg").remove();
        // }
        const selection_string = "#" + id;
        if (document.querySelectorAll(selection_string + " svg")[0] != null) {
          document.querySelectorAll(selection_string + " svg")[0].remove();
        }

        const element = $(selection_string);
        const margin = { top: 20, right: 30, bottom: 15, left: 40 };
        if (this.xAxisAngle > 0) {
          margin.bottom += (this.xAxisAngle / 2);
        }
        const width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

        const x = d3.scaleBand()
          .range([0, width])
          .paddingInner(.2)
          .paddingOuter(.2);

        const y = d3.scaleLinear()
          .range([height - margin.bottom, 0]);

        const xAxis = d3.axisBottom()
          .scale(x)
          .tickSizeOuter(0);

        const yAxis = d3.axisLeft()
          .scale(y)
          .tickSizeInner(-width)
          .tickSizeOuter(0);

        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
          .style("opacity", 0);

        const chart = d3
          .select(selection_string)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        if (data.length > 0) {
          y.domain([
            0,
            d3.max(data, function(d) {
              return d.y;
            })
          ]);
          x.domain(
            data.map(function(d) {
              return d.x;
            })
          );
        }

        chart
          .append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," +  (height - margin. bottom) + ")")
          .call(xAxis)
          .append("text")
          .attr("class", "label")
          .attr("x", width / 2 + margin.right)
          .attr("y", 30)
          .style("text-anchor", "middle")
          .text(xaxisvalue);

        const text = chart.selectAll("text");

        if (this.xAxisAngle > 0) {
            text
                .attr("transform", `rotate(${this.xAxisAngle}) translate(0, ${margin.top})`)
                .style("text-anchor", "middle");

            const dimensions = text.node().getBBox();

            if (this.xAxisAngle === 45) {
              text.attr("x", 15)
                  .attr("y", dimensions.height * 2);
            }

            if (this.xAxisAngle === 90) {
              text.attr("x", dimensions.width - 10)
                  .attr("y", 0);
            }
        }

        chart
          .append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(yaxisvalue);

        if (data.length > 0) {
          chart
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
              return x(d.x);
            })
            .attr("y", function(d) {
              return y(d.y);
            })
            .attr("height", function(d) {
              return height - y(d.y) - margin.bottom;
            })
            .attr("width", x.bandwidth() - x.paddingInner())
            .style("fill", "#2DA8C9")
            .on("mouseover", function(d) {
              const yval = mouseover_callback(d.y);
              tooltip
                .transition()
                .duration(100)
                .style("opacity", 1);
              tooltip
                .html(
                  xaxisvalue +
                    ": <b>" +
                    d.x + "</b><br>" +
                  yaxisvalue +
                    ": <b>" +
                    yval + "</b>"
                )
                .style("left", d3.event.pageX + 5 + "px")
                .style("top", d3.event.pageY - 28 + "px");
              d3
                .select(this)
                .transition()
                .duration(50)
                .style("fill", "#2485B4");
            })
            .on("mouseout", function(d) {
              d3
                .select(this)
                .transition()
                .duration(100)
                .style("fill", "#2DA8C9");
              tooltip
                .transition()
                .duration(300)
                .style("opacity", 0);
            });
        }
  }

}
