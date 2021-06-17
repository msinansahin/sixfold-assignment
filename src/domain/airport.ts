import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Airport  {

    @PrimaryColumn()
    id: number;

    @Column({nullable: true, type: "varchar"})
    name: string;

    @Column({nullable: true, type: "varchar"})
    city: string;

    @Column({nullable: true, type: "varchar"})
    country: string;

    @Column({nullable: true, type: "varchar"})
    iata: string;

    @Column({nullable: true, type: "varchar"})
    icao: string

    @Column({nullable: true, type: "numeric"})
    lat: number;

    @Column({nullable: true, type: "numeric"})
    lon: number;

    @Column({nullable: true, type: "numeric"})
    alt: number;

    @Column({nullable: true})
    timezone: number;

    @Column({nullable: true})
    dst: string;

    @Column({nullable: true, name: "tz_time_zone"})
    tzTimeZone: string;

    @Column({nullable: true})
    type: string;

    @Column({nullable: true})
    source: string;
}
