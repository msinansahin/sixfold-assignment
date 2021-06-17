import {RouteDto} from "../dto/route.dto";

const createGraph = require("ngraph.graph");

/** wrapes the 'ngraph' graph' library object stuff */
export class GraphWrapper {

    private static instance: GraphWrapper; // singleton
    private readonly _graph: any; // ngraph object
    private constructor() {
        this._graph = createGraph();
    }

    get graph(): any {
        return this._graph;
    }

    addLinkByRoute(route: RouteDto) {
        this._graph.addLink(route.sourceAirport, route.destinationAirport, {weight: route.distance});
    }

    static getInstance(): GraphWrapper {
        if (!GraphWrapper.instance) {
            GraphWrapper.instance = new GraphWrapper();
        }
        return GraphWrapper.instance;
    }

}
