networkRendering = networkRendering.default;

var data = {
  nodes: [
    {
      x: 200,
      y: 200,
      r: 50
    },
    {
      x: 400,
      y: 300,
      r: 20
    }
  ],
  links: [
    {
      source: 0,
      target: 1,
      bend: 20
    }
  ]
};

// Connect network
data.links.forEach(function(link) {
  link.source = data.nodes[link.source];
  link.target = data.nodes[link.target];
});

var width = 960,
    height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var nodes = svg.append("g").selectAll(".node")
    .data(data.nodes)
  .enter().append("circle")
    .attr("class", "node")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", function(d) { return d.r; });


var links = svg.append("g").selectAll(".link")
    .data(data.links)
  .enter().append("path")
    .attr("class", "link")
    .attr("d", networkRendering.halfLink);


function tick() {
  path.attr("d", networkRendering.halfLink);
  circle.attr("transform", transform);
  text.attr("transform", transform);
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}
