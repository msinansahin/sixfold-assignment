import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

/** some fields are not used, they are needed just to make them suit with .dat file */
@Entity()
export class Route {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    airline: string;

    @Column({name: 'airline_id'})
    airlineId: number;

    @Column({name: 'source_airport'})
    sourceAirport: string;

    @Column({name: 'source_airport_id'})
    sourceAirportId: number;

    @Column({name: 'destination_airport'})
    destinationAirport: string;

    @Column({name: 'destination_airport_id'})
    destinationAirportId: number;

    @Column("varchar", {nullable: true})
    codeshare: string;

    @Column({nullable: true})
    stops: number;

    @Column({nullable: true})
    equipment: string;

}
