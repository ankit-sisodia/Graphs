class Graph {
  n;
  vertices = [];
  constructor(n) {
    this.n = n;
    this.vertices = Array(n)
      .fill(0)
      .map(() => []);
  }

  addEdge(from, to, bidirectional = false) {
    this.vertices[from].push(to);
    if (bidirectional) {
      this.vertices[to].push(from);
    }
  }

  bfs(src, dest) {
    let queue = [];
    let visited = Array(this.n).fill(false);
    let dist = [];
    let parent_node = [];
    queue.push(src);
    visited[src] = true;
    dist[src] = 0;
    parent_node[src] = src;

    while (queue.length > 0) {
      let node = queue.shift();
      for (let nbr of this.vertices[node]) {
        if (!visited[nbr]) {
          queue.push(nbr);
          visited[nbr] = true;
          dist[nbr] = dist[node] + 1;
        }
      }
    }

    return dist[dest];
  }

  printGraph() {
    for (let v in this.vertices) {
      let edges = [];
      for (let value of this.vertices[v]) {
        edges.push(value);
      }
      console.log(v, ' --> ', edges);
    }
  }
}

function min_dice_throws(n, snakes, ladders) {
  let board = Array(n + 1).fill(0);
  for (let [from, to] of snakes) {
    board[from] = to - from;
  }

  for (let [from, to] of ladders) {
    board[from] = to - from;
  }

  let g = new Graph(n + 1);
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= 6; j++) {
      let to = i + j;
      to += board[to];
      if (to <= n) {
        g.addEdge(i, to);
      }
    }
  }

  return g.bfs(1, n);
}

let result = min_dice_throws(
  36,
  [
    [17, 4],
    [20, 6],
    [34, 12],
    [24, 16],
    [32, 30],
  ],
  [
    [2, 15],
    [5, 7],
    [9, 27],
    [18, 29],
    [25, 35],
  ]
);

console.log('solution -> ', result);

// let graph = new Graph(36);

// let edges = [
//   [1, 2],
//   [3, 4],
//   [0, 4],
//   [4, 1],
// ];
// for (let [from, to] of edges) {
//   graph.addEdge(from, to);
// }
// graph.printGraph();
