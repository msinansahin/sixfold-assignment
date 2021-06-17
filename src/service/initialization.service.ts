import {EntityManager} from "typeorm/entity-manager/EntityManager";
import {Route} from "../domain/route";
import {GraphWrapper} from "./graph.wrapper";
import {RouteMapper} from "./route.mapper";

export interface GraphProcessListener {
    graphInitializingStarting(): void;
    graphInitialized(count: number): void;
}

// initializes graph nodes and links
export class InitializationService {

    private processedRouteCount = 0;
    private totalRouteCount = 0;

    private readonly graphProcessListeners: GraphProcessListener[] = [];

    constructor(private readonly em: EntityManager, private readonly routeMapper: RouteMapper) {
    }

    registerListener(listener: GraphProcessListener) {
        this.graphProcessListeners.push(listener);
    }

    async initializeGraph(): Promise<number> {
        this.graphProcessListeners.forEach(listener => listener.graphInitializingStarting());
        return this.em.connection.manager.find(Route)
            .then(routes => {
                this.totalRouteCount = routes.length;
                this.addRoutesToGraphWrapper(routes);
                return Promise.resolve(routes.length);
            });
    }

    private isGraphInitialized(): boolean {
        return this.processedRouteCount >= this.totalRouteCount;
    }

    private notifyListenersAsInitialized() {
        if (this.isGraphInitialized()) {
            this.graphProcessListeners.forEach(listener => listener.graphInitialized(this.totalRouteCount));
        }
    }

    private async addRoutesToGraphWrapper(routes: Route[]) {

        return Promise.all(routes.map((route) => {
            this.routeMapper
                .toDto(route)
                .then(dto => {
                    this.processedRouteCount++;
                    GraphWrapper.getInstance().addLinkByRoute(dto);
                    this.notifyListenersAsInitialized();
                })
                .catch(error => {
                    this.processedRouteCount++;
                    this.notifyListenersAsInitialized();
                });
        }));

    }

}
