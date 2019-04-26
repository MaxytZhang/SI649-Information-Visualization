$(document).ready(function () {
    getData();
    $('.sjs-sortablejs-result').removeAttr("style");
    $('.sjs-sortablejs-result').attr("style", "border: 1px solid #007bff; width: 100%; min-height: 50px; margin-top: 10px;");
    $('.sjs-sortablejs-source').removeAttr("style");
    $('.sjs-sortablejs-source').attr("style", "border: 1px solid #007bff; width: 100%; min-height: 50px; margin-top: 10px;");
    $('.sjs-sortablejs-item').removeAttr("style");
    $('.sjs-sortablejs-item').attr("style", "background-color:#007bff;color:#fff;margin:5px;padding:10px;");

});

function getData() {
    d3.csv("us_norm.csv", (d) => {
        data = d;

        var fil = d3.keys(data[0]).filter((key) => { return key !== "year"; });

        var factors = fil.map(function(name) {
            return {
                name: name,
                values: data.map(function(d) {
                    return {year: d.year, other: d[name]};
                })
            };
        });

        var spirit = [factors[2], factors[17], factors[18], factors[19]];
        multiLineChart(spirit, "#p3_3");
    });
}


function multiLineChart(dataitems, pos) {
    console.log(dataitems);
    suicide = dataitems[0];
    other = dataitems[1];
    var margin = { top: 20, right: 20, bottom: 30, left: 40};
    var width = 800 - margin.left - margin.right;
    var height = 450 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.year; }))
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([-2, 3])
        .range([height, 0]);

    console.log(y(dataitems));

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
    // svg.append("g")
    //     .call(d3.axisLeft(y));


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
        .attr("stroke-width", function (d) { if (d.name == "suicide_rate_per1k")
        {return 5;}
        else if (d.name == "Spirits Consumption Per Person (litres per person)"){
            return 5
        }
        else {return 2;}
        })
        .style("stroke", function(d) { if (d.name == "suicide_rate_per1k")
        {return "#0AC1CF"}
        else if (d.name == "Spirits Consumption Per Person (litres per person)"){
            return "#608FD9"
        }
        else {return "black";}
        })
        .transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

    svg.append("text")
        .attr("transform", "translate(" + -40 + "," + (y(dataitems[0]['values'][0]['other'])-10) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "#0AC1CF")
        .text("Suicide Rate");

    svg.append("text")
        .attr("transform", "translate(" + -40 + "," + (y(dataitems[1]['values'][0]['other'])-10) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "#608FD9")
        .text("Spirits");

    svg.append("text")
        .attr("transform", "translate(" + -40 + "," + (y(dataitems[2]['values'][0]['other'])-10) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "black")
        .text("Beer");

    svg.append("text")
        .attr("transform", "translate(" + -40 + "," + (y(dataitems[3]['values'][0]['other'])-10) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "black")
        .text("Wine");
}