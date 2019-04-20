$(document).ready(function () {
    getData();
});

function getData() {
    d3.csv("us_norm.csv", (d) => {
        data = d;
        // console.log(d[0]);

        var fil = d3.keys(data[0]).filter((key) => { return key !== "year"; });
        // console.log(fil);

        var factors = fil.map(function(name) {
            return {
                name: name,
                values: data.map(function(d) {
                    return {year: d.year, other: d[name]};
                })
            };
        });

        var spirit = [factors[2], factors[17], factors[18], factors[19]];
        multiLineChart(spirit, "#p3-2");
    });
}


function multiLineChart(dataitems, pos) {
    suicide = dataitems[0];
    other = dataitems[1];
    var margin = { top: 20, right: 20, bottom: 30, left: 60};
    var width = 940 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.year; }))
        .range([0, width]);
    console.log(x);

    var y = d3.scaleLinear()
        .domain([-2, 2])
        .range([height, 0]);
    console.log(y);

    var line = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.other); });

    var svg = d3.select(pos).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(10));
    svg.append("g")
        .call(d3.axisLeft(y));

    var factor = svg.selectAll(".factor")
        .data(dataitems)
        .enter().append("g")
        .attr("class", "factor");


    var path = svg.selectAll(".factor").append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .attr("stroke-dasharray", function() {
            var totalLength = this.getTotalLength();
            return totalLength + " " + totalLength;
        })
        .attr("stroke-dashoffset", function() {
            var totalLength = this.getTotalLength();
            return totalLength;
        })
        .transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .style("stroke", function(d) { if (d.name == "suicide_rate_per1k")
        {return "rgb(000,255,000)"}
        else if (d.name == "Depression (%)"){
            return "rgb(255,000,000"
        }
        else {return "#000";}
        });

}