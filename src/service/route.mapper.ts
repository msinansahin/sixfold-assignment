import {EntityManager} from "typeorm/entity-manager/EntityManager";
import {Route} from "../domain/route";
import {RouteDto} from "../dto/route.dto";
import {Airport} from "../domain/airport";
import Utils from "../tool/utils";

export class RouteMapper {

    constructor(private readonly em: EntityManager) {
    }

    async toDto(route: Route): Promise<RouteDto> {
        const sourceAirport = await this.em.connection
            .getRepository(Airport)
            .createQueryBuilder()
            .where("id = :id", {id: route.sourceAirportId})
            .getOne();
        const destinationAirport = await this.em.connection
            .getRepository(Airport)
            .createQueryBuilder()
            .where("id = :id", {id: route.destinationAirportId})
            .getOne();
        return new Promise(function (resolve, reject) {
            if (sourceAirport && destinationAirport) {
                let distInKm = Utils.distance(sourceAirport.lat, sourceAirport.lon, destinationAirport.lat, destinationAirport.lon, 'K');
                resolve({
                    sourceAirport: route.sourceAirport,
                    destinationAirport: route.destinationAirport,
                    distance: distInKm
                });
            } else {
                reject("Source or destination airport could not be found: " +
                    `source-id:${route.sourceAirportId}, destination-id:${route.destinationAirportId}`);
            }
        });
    }
}
