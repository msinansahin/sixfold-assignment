const createGraph = require("ngraph.graph");
const createPath = require("ngraph.path");


test('ngraph lib is secure - find shortest path', () => {
    const graph = createGraph();
    graph.addLink('a', 'b', {weight: 2});
    graph.addLink('b', 'f', {weight: 8});
    graph.addLink('b', 'c', {weight: 3});
    graph.addLink('b', 'e', {weight: 1});
    graph.addLink('e', 'd', {weight: 1});
    graph.addLink('c', 'd', {weight: 5});
    graph.addLink('d', 'f', {weight: 2});
    graph.addLink('b', 'f', {weight: 8});

    let pathFinder = createPath.aStar(graph, {
        // We tell our pathfinder what should it use as a distance function:
        distance(fromNode: any, toNode: any, link: any) {
            // We don't really care about from/to nodes in this case,
            // as link.data has all needed information:
            return link.data.weight;
        }
    });
    const paths = pathFinder.find('a', 'f');
    let result = "";
    for (let i = paths.length - 1; i >= 0 ; i--) {
        result += paths[i].id;
    }
    expect(result).toBe("abedf");
});
