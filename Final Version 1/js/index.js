var data = [
    {
         "Sex":"Males",
         "Cut/pierce":606,
         "Drowning":316,
         "Fall":729,
         "Fire/burn":131,
         "Firearm":18910,
         "Other Spec., NEC":114,
         "Other Spec., classifiable":450,
         "Poisoning": 3407,
         "Struck by or Against": 3,
         "Suffocation": 9134,
         "Transportation- Related": 128,
         "Unspecified": 67         
      },
      {
         "Sex":"Females",
         "Cut/pierce":119,
         "Drowning":152,
         "Fall":225,
         "Fire/burn":45,
         "Firearm":2607,
         "Other Spec., NEC":32,
         "Other Spec., classifiable":151,
         "Poisoning": 2875,
         "Struck by or Against": 0,
         "Suffocation": 2400,
         "Transportation- Related": 43,
         "Unspecified": 23  
      }
]

$(document).ready(function () {
    loadData();
})

function loadData() {
    var margin = {top: 20, right: 20, bottom: 40, left: 60},
        width = 450 - margin.left - margin.right,
        height = 315 - margin.top - margin.bottom,
        that = this;

    var x = d3.scale.ordinal().rangeRoundBands([0, width-100], .3);
    var y = d3.scale.linear().rangeRound([height, 0]);
    var color = d3.scale.category20();

    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format(".0%"));

    var svg = d3.select("#chart7").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                  
    color.domain(d3.keys(data[0]).filter(function (key) {
        return key !== "Sex";
    }));
    
    data.forEach(function (d) {
        var y0 = 0;

        d.rates = color.domain().map(function (name) {
            // console.log();
            return {
                name: name,
                y0: y0,
                y1: y0 += +d[name],
                amount: d[name]
            };
        });
        d.rates.forEach(function (d) {
            d.y0 /= y0;
            d.y1 /= y0;
        });

        // console.log(data);
    });

    data.sort(function (a, b) {
        return b.rates[0].y1 - a.rates[0].y1;
    });

    x.domain(data.map(function (d) {
        return d.Sex;
    }));

    svg.append("g").attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")").call(xAxis);
    svg.append("g").attr("class", "y axis").call(yAxis);

    var sex = svg.selectAll(".sex").data(data).enter().append("g")
                .attr("class", "sex").attr("transform", function (d) {
                    return "translate(" + x(d.Sex) + ",0)";
                });

    sex.selectAll("rect").data(function (d) {return d.rates;})
        .enter().append("rect").attr("width", x.rangeBand())
        .attr("y", function (d) {return y(d.y1);})
        .attr("height", function (d) {return y(d.y0) - y(d.y1);})
        .style("fill", function (d) {return color(d.name);})
        .on("mouseover", function() { tooltip.style("display", null); })
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
            var xPosition = d3.mouse(this)[0]+10;
            var yPosition = d3.mouse(this)[1]-25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d.amount);
    });

    var legend = svg.selectAll(".legend").data(color.domain().slice().reverse()).enter().append("g").attr("class", "legend").attr("transform", function (d, i) {
        return "translate(-50,"+ i * 20 +")";
    });

    legend.append("rect").attr("x", width + -53).attr("width", 10)
        .attr("height", 10).style("fill", color);
    legend.append("text").attr("x", width - 40).attr("y", 5).attr("width", 40)
        .attr("dy", ".35em").style("text-anchor", "start").text(function (d) {
        return d;
    });

    var tooltip = svg.append("g").attr("class", "tooltip").style("display", "none");
    tooltip.append("rect").attr("width", 30).attr("height", 20).attr("fill", "white").style("opacity", 0.5);
    tooltip.append("text").attr("x", 15).attr("dy", "1.2em").style("text-anchor", "middle")
           .attr("font-size", "10px").attr("font-weight", "bold");

}