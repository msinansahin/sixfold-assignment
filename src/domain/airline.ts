import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Airline {
    @PrimaryColumn()
    id: number;

    @Column("varchar")
    name: string;

    @Column()
    alias: string;

    @Column("varchar")
    iata: string;

    @Column("varchar")
    icao: string

    @Column()
    callsign: string;

    @Column()
    country: string;

    @Column()
    active:	string;
}
