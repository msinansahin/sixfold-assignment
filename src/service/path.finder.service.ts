import {ShortestPathResult} from "../dto/shortest.path.result";
import {EntityManager} from "typeorm/entity-manager/EntityManager";
import {Airport} from "../domain/airport";

const createPath = require("ngraph.path");

export class PathFinderService {

    constructor(private readonly em: EntityManager) {
    }

    findShortestPath(graph: any, from: string, to: string): Promise<ShortestPathResult> {
        if (!from || !to) {
            return Promise.reject("Insufficient parameters. Sample: from=TLL&destination=IST");
        }

        const pathFinder = createPath.aStar(graph, {
            distance(fromNode: any, toNode: any, link: any) {
                return link.data.weight;
            }
        });

        let normalizedFrom = graph.hasNode(from) ? new Promise(function (resolve) {resolve(from)}) :
            this.findIataByIcao(from).then(airport => {return airport.iata;});
        let normalizedTo = graph.hasNode(to) ? new Promise(function (resolve) {resolve(to)}) :
            this.findIataByIcao(to).then(airport => {return airport.iata;});

        return Promise.all([normalizedFrom, normalizedTo])
            .then(results => {
                console.log("from " + results[0] + ", to " + results[1]);
                const paths = pathFinder.find(results[0], results[1]);
                return Promise.resolve(new ShortestPathResult(paths));
            })
            .catch(error => Promise.reject("Nodes are not in graph"));
    }

    private findIataByIcao(code: string): Promise<Airport> {
        return this.em.connection
            .getRepository(Airport)
            .createQueryBuilder()
            .where("icao = :code and iata is not null and iata != '-99' and iata != '' ", {code: code})
            .getOne();
    }

}
