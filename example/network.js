
var data = {
  nodes: [
    {
      x: 100,
      y: 100,
      r: 50
    },
    {
      x: 300,
      y: 200,
      r: 20
    }
  ],
  links: [
    {
      source: 0,
      target: 1,
      weight: 2
    },
    {
      source: 1,
      target: 0,
      weight: 1
    }
  ]
};

// Connect network
data.links.forEach(function(link) {
  link.source = data.nodes[link.source];
  link.target = data.nodes[link.target];
});

var width = 400,
    height = 400;

// var linkRenderer = networkRendering.getLinkRenderer()
//   .bend(function(d) { return 20; })
//   .width(function(d) { return d.weight * 10; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var links = svg.append("g").selectAll(".link")
    .data(data.links)
  .enter().append("path")
    .attr("class", "link")
    .style("fill", "none")
    .style("stroke", "#666")
    .style("stroke-width", "1.5px")
    .attr("d", networkRendering.halfLink);

var nodes = svg.append("g").selectAll(".node")
    .data(data.nodes)
  .enter().append("circle")
    .attr("class", "node")
    .style("fill", "#ccc")
    .style("stroke", "#333")
    .style("stroke-width", "1.5px")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", function(d) { return d.r; });
