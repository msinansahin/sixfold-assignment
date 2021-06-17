import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: "nearby_airport"})
export class NearbyAirport  {

    @PrimaryColumn()
    sourceId: number;

    @PrimaryColumn()
    destinationId: number;

    @Column({nullable: false, type: "numeric"})
    distance: string;

}
