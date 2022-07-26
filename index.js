class Graph {
  vertices = {};
  constructor(n) {}

  addEdge(from, to, bidirectional = true) {
    if (!this.vertices[from]) this.vertices[from] = new Set();
    this.vertices[from].add(to);
    if (bidirectional) {
      if (!this.vertices[to]) this.vertices[to] = new Set();
      this.vertices[to].add(from);
    }
  }

  printGraph() {
    for (let v in this.vertices) {
      let edges = [];
      for (let value of this.vertices[v].values()) {
        edges.push(value);
      }
      console.log(v, ' --> ', edges);
    }
  }
}

let graph = new Graph(5);
// graph.addEdge(2, 4);
// graph.addEdge(1, 3);
// graph.addEdge(2, 3);
// graph.addEdge(0, 4);
// graph.printGraph();

let edges = [
  [1, 2],
  [3, 4],
  [0, 4],
  [4, 1],
];
for (let [from, to] of edges) {
  graph.addEdge(from, to);
}
graph.printGraph();
