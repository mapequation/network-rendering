
var data = {
  nodes: [
    {
      x: 100,
      y: 100,
      flow: 0.6,
      outFlow: 0.3
    },
    {
      x: 300,
      y: 180,
      flow: 0.4,
      outFlow: 0.2
    }
  ],
  links: [
    {
      source: 0,
      target: 1,
      flow: 0.5
    },
    {
      source: 1,
      target: 0,
      flow: 0.3
    }
  ]
};

// Connect network
data.links.forEach(function(link) {
  link.source = data.nodes[link.source];
  link.target = data.nodes[link.target];
});

// Connect opposite links
data.links[0].oppositeLink = 1;
data.links[1].oppositeLink = 0;

var width = 400,
    height = 300;

var nodeFillColor = d3.scale.linear()
  .domain(d3.extent(data.nodes, function(d) { return d.flow; }))
  .range(["#EF7518", "#D75908"]);
var nodeBorderColor = d3.scale.linear()
  .domain(d3.extent(data.nodes, function(d) { return d.outFlow; }))
  .range(["#FFAE38", "#f9a327"]);
var nodeRadius = d3.scale.linear()
  .domain(d3.extent(data.nodes, function(d) { return d.flow; }))
  .range([20, 30]);
var nodeBorderWidth = d3.scale.linear()
  .domain(d3.extent(data.nodes, function(d) { return d.outFlow; }))
  .range([3, 6]);
var linkFillColor = d3.scale.linear()
  .domain(d3.extent(data.links, function(d) { return d.flow; }))
  .range(["#71B2D7", "#418EC7"]);
var linkWidth = d3.scale.linear()
  .domain(d3.extent(data.links, function(d) { return d.flow; }))
  .range([7, 13]);

var linkRenderer = networkRendering.halfLink()
  .nodeRadius(function(node) { return nodeRadius(node.flow); })
  .width(function(d) { return linkWidth(d.flow); })
  .oppositeLink(function(d) { return data.links[d.oppositeLink]; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var links = svg.append("g").selectAll(".link")
    .data(data.links)
  .enter().append("path")
    .attr("class", "link")
    .style("fill", function(d) { return linkFillColor(d.flow); })
    .style("stroke", "none")
    .style("stroke-width", "1.5px")
    .attr("d", linkRenderer);

var nodes = svg.append("g").selectAll(".node")
    .data(data.nodes)
  .enter().append("circle")
    .attr("class", "node")
    .style("fill", function(d) { return nodeFillColor(d.flow); })
    .style("stroke", function(d) { return nodeBorderColor(d.outFlow); })
    .style("stroke-width", function(d) { return nodeBorderWidth(d.outFlow); })
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", function(d) { return nodeRadius(d.flow); });
