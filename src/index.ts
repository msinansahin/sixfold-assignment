import "reflect-metadata";
import {createConnection} from "typeorm";
import {GraphWrapper} from "./service/graph.wrapper";
import {RouteMapper} from "./service/route.mapper";
import {EntityManager} from "typeorm/entity-manager/EntityManager";
import {GraphProcessListener, InitializationService} from "./service/initialization.service";
import {PathFinderService} from "./service/path.finder.service";
import Utils from "./tool/utils";

enum AppState {
    STARTING,
    GRAPH_INITIALIZING,
    GRAPH_INITIALIZED
}

let serviceRegistry: ServiceRegistry;
let appState: AppState;
const DEFAULT_PORT = 8881;

class GraphRouteListenerImpl implements GraphProcessListener{
    graphInitialized(count: number): void {
        appState = AppState.GRAPH_INITIALIZED;
        console.log("[Graph] Initializing finished by count: ", count);
        console.log("[Graph] App is read to accept shortest path query between two airports");
    }

    graphInitializingStarting(): void {
        appState = AppState.GRAPH_INITIALIZING;
        console.log("[Graph] Initializing started. App is not read to accept shortest path query");
    }
}

createConnection().then(async connection => {
    appState = AppState.STARTING;
    serviceRegistry = ServiceRegistry.init(connection.manager);

    serviceRegistry.initializationService.registerListener(new GraphRouteListenerImpl());
    serviceRegistry.initializationService.initializeGraph()
        .then(count => {
            console.log("[Graph] Routes loaded from DB and creating links ... ", count);
        });

    console.debug("Here you can setup and run express/koa/any other framework.");

    const express = require("express");
    const app = express();
    const port = Utils.getPortFromCommandLine() || DEFAULT_PORT;

    app.get("/", (req: any, res: any) => {
        res.send("Sixfold Assigment" +
            "<br/>" +
            "<br/><a href='/find-path?from=TLL&to=IST'>Find path between airports</a>");
    });

    app.get("/find-path", (req: any, res: any) => {
        const from = req.query.from;
        const to = req.query.to;
        console.log('find-path request by from -> to', from, to);

        if (appState != AppState.GRAPH_INITIALIZED) {
            return res.send({
                error: 'Graph is being initialized. Try later.'
            });
        }

        serviceRegistry.pathFinderService
            .findShortestPath(GraphWrapper.getInstance().graph, from, to)
            .then(result => res.send(result.getPrettyJson()))
            .catch(reason => res.send({
                error: reason
            }));
    });

    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port} - for development purpose`);
        console.log(`Server started listening on ${port}`);
    });

}).catch(error => console.log(error));

class ServiceRegistry {

    private static instance: ServiceRegistry;
    private readonly _routeMapper: RouteMapper;
    private readonly _pathFinderService: PathFinderService;
    private readonly _initializationService: InitializationService;

    private constructor(em: EntityManager) {
        this._routeMapper = new RouteMapper(em);
        this._pathFinderService = new PathFinderService(em);
        this._initializationService = new InitializationService(em, this._routeMapper);
        console.log('Service registry created')
    }

    static init(em: EntityManager): ServiceRegistry {
        if (!ServiceRegistry.instance) {
            ServiceRegistry.instance = new ServiceRegistry(em);
        }
        return ServiceRegistry.instance;
    }

    get routeMapper(): RouteMapper {
        return this._routeMapper;
    }

    get pathFinderService(): PathFinderService {
        return this._pathFinderService;
    }

    get initializationService(): InitializationService {
        return this._initializationService;
    }

}
