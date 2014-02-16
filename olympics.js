var width = 800;
var height = 500;
var padding = 50;
var data = {};
var colours = d3.scale.category20();
var svg = d3.select("body")
    .append("svg")
    .attr("width", width + "px")
    .attr("height", height + "px");

d3.json("data.json", function(error, json) {
    data = json;
    draw();
});

var draw = function() {
    var xMin = d3.min(data.olympics.games, function(d) {
        return d.year;
    });

    var xMax = d3.max(data.olympics.games, function(d) {
        return d.year;
    });

    var xScale = d3.scale.linear().domain([xMin, xMax]).range([0 + padding, width - padding]);

    var yMin = d3.min(data.olympics.games, function(d) {
        return d.countries;
    });
    var yMax = d3.max(data.olympics.games, function(d) {
        return d.countries;
    });

    var yScale = d3.scale.linear().domain([yMin, yMax]).range([height - padding, 0 + padding]);

    var rMin = d3.min(data.olympics.games, function(d) {
        return d.sports;
    });

    var rMax = d3.max(data.olympics.games, function(d) {
        return d.sports;
    });

    var rScale = d3.scale.linear().domain([rMin, rMax]).range([2, 20]);

    svg.selectAll("circle")
        .data(data.olympics.games)
        .enter()
        .append("circle")
        .attr("class", "game")
        .attr("cx", function(d) {
            return xScale(d.year) + "px"
        })
        .attr("cy", function(d) {
            return yScale(d.countries) + "px"
        })
        .attr("r", function(d) {
            return rScale(d.sports) + "px"
        })
        .style("fill", function(d, i) {
            return colours(i)
        })
        .on("click", function(d) {
            console.log(d.year);
        });

    svg.selectAll("text")
        .data(data.olympics.games)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", function(d) {
            return xScale(d.year) + "px"
        })
        .attr("y", function(d) {
            return yScale(d.countries) + "px"
        })
        .text(function(d) {
            return d.city
        });

    var xAxis = d3.svg.axis().scale(xScale);
    svg.append("g")
        .attr("transform", "translate(0, " + (height - padding) + ")")
        .attr("class", "xaxis")
        .style({"stroke-width": "1px", "fill": "none", "stroke": "steelblue"})
        .call(xAxis);

    var yAxis = d3.svg.axis().scale(yScale).orient("left");
    svg.append("g")
        .attr("transform", "translate(" + padding + ", 0)")
        .attr("class", "yaxis")
        .style({"stroke-width": "1px", "fill": "none", "stroke": "steelblue"})
        .call(yAxis);
};

var redraw = function(value) {
    var r = window.r || "sports"
    var x = window.x || "year"
    var y = window.y || "countries"

    var rMin = d3.min(data.olympics.games, function(d) {
        return d[r];
    });

    var rMax = d3.max(data.olympics.games, function(d) {
        return d[r];
    });

    var rScale = d3.scale.linear().domain([rMin, rMax]).range([2, 20]);

    var xMin = d3.min(data.olympics.games, function(d) {
        return d[x];
    });

    var xMax = d3.max(data.olympics.games, function(d) {
        return d[x];
    });

    var xScale = d3.scale.linear().domain([xMin, xMax]).range([0 + padding, width - padding]);

    var yMin = d3.min(data.olympics.games, function(d) {
        return d[y];
    });

    var yMax = d3.max(data.olympics.games, function(d) {
        return d[y];
    });

    var yScale = d3.scale.linear().domain([yMin, yMax]).range([height - padding, 0 + padding]);

    d3.selectAll("circle")
        .attr("cx", function(d) {
            return xScale(d[x]) + "px"
        })
        .attr("cy", function(d) {
            return yScale(d[y]) + "px"
        })
        .attr("r", function(d) {
            return rScale(d[r]) + "px"
        });

    d3.selectAll("text")
        .attr("x", function(d) {
            return xScale(d[x]) + "px"
        })
        .attr("y", function(d) {
            return yScale(d[y]) + "px"
        });

    var xAxis = d3.svg.axis().scale(xScale);
    svg.select("g.xaxis").call(xAxis);

    var yAxis = d3.svg.axis().scale(yScale).orient("left");
    svg.select("g.yaxis").call(yAxis);
};
