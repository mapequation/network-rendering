# network-rendering
[![NPM](https://nodei.co/npm/network-rendering.png?downloads=true&stars=true)](https://www.npmjs.com/package/network-rendering)

Draw nice nodes and links in SVG. Developed for the network visualization tools at [mapequation.org](http://www.mapequation.org).

![Example image](https://cdn.rawgit.com/mapequation/network-rendering/4166608c9a292335b809faa56ecbe2dc751c29d7/example.svg)


Install
-------

```bash
npm install network-rendering
```


Example
-------

```js
import d3 from 'd3';
import networkRendering from 'network-rendering';

const linkRenderer = networkRendering.halfLink()
  .nodeRadius(node => node.size)
  .width(link => link.size)
  .oppositeLink(link => data.links[link.oppositeLink]);

svg.append("g").selectAll(".link")
    .data(data.links)
  .enter().append("path")
    .attr("class", "link")
    .style("fill", "grey")
    .style("stroke", "black")
    .attr("d", linkRenderer);
```


API
---

### networkRendering.halfLink() -> halfLinkRenderer

Creates a half-link renderer function with chainable methods.

#### halfLinkRenderer(link) -> string

Returns an SVG path string to render the `link` based on the accessor functions below.

#### halfLinkRenderer.source([sourceAccessor]) -> self

If `sourceAccessor` is specified, sets the source node accessor to the specified function. If not specified, returns the current source node accessor, which defaults to:

```js
(link) => link.source
```

#### halfLinkRenderer.target([targetAccessor]) -> self

If `targetAccessor` is specified, sets the target node accessor to the specified function. If not specified, returns the current target node accessor, which defaults to:

```js
(link) => link.target
```

#### halfLinkRenderer.nodeRadius([radius]) -> self

If `radius` is specified, sets the node radius accessor to the specified function or constant. If not specified, returns the current node radius accessor, which defaults to:

```js
(node) => node.size || 10
```

#### halfLinkRenderer.nodeX([x]) -> self

If `x` is specified, sets the nodes' x-coordinate accessor to the specified function or constant. If not specified, returns the nodes' current x-coordinate accessor, which defaults to:

```js
(node) => node.x
```

#### halfLinkRenderer.nodeY([y]) -> self

If `y` is specified, sets the nodes' y-coordinate accessor to the specified function or constant. If not specified, returns the nodes' current y-coordinate accessor, which defaults to:

```js
(node) => node.y
```

#### halfLinkRenderer.width([width]) -> self

If `width` is specified, sets the width accessor to the specified function or constant. If not specified, returns the current width accessor, which defaults to:

```js
(link) => link.size || 10
```

#### halfLinkRenderer.oppositeLink([oppositeLink]) -> self

If `oppositeLink` is specified, sets the opposite link accessor to the specified function. If not specified, returns the current opposite link accessor, which defaults to:

```js
(link) => null
```

If the link renderer can't access opposite links, existing opposite links may not be rendered to fit nicely together.


#### halfLinkRenderer.bend([bend]) -> self

If `bend` is specified, sets the bend accessor to the specified function or constant. If not specified, returns the current bend accessor, which defaults to:

```js
(link) => link.bend || 30
```

### networkRendering.undirectedLink() -> undirectedLinkRenderer

Creates a undirected-link renderer function with chainable methods.
The API is the same as for halfLinkRenderer except that oppositeLink does not exist in undirectedLinkRenderer.


License
-------

[MPL-2.0](https://github.com/mapequation/network-rendering/blob/master/LICENSE)
