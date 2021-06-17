create table airline
(
    id integer not null
        constraint "PK_747031282d0fca21384f757e15c"
            primary key,
    name varchar not null,
    alias varchar not null,
    iata varchar not null,
    icao varchar not null,
    callsign varchar not null,
    country varchar not null,
    active varchar not null
);

alter table airline owner to postgres;

create table airport
(
    id integer not null
        constraint "PK_c84c6733a39c474750c4932fd41"
            primary key,
    name varchar,
    city varchar,
    country varchar,
    iata varchar,
    icao varchar,
    lat numeric,
    lon numeric,
    alt numeric,
    timezone integer,
    dst varchar,
    tz_time_zone varchar,
    type varchar,
    source varchar
);

alter table airport owner to postgres;

create table route
(
    id serial not null
        constraint "PK_08affcd076e46415e5821acf52d"
            primary key,
    airline varchar not null,
    airline_id integer not null,
    source_airport varchar not null,
    source_airport_id integer not null,
    destination_airport varchar not null,
    destination_airport_id integer not null,
    codeshare varchar,
    stops integer,
    equipment varchar
);

alter table route owner to postgres;

create table nearby_airport
(
    "sourceId" integer not null,
    "destinationId" integer not null,
    distance numeric not null,
    constraint "PK_41d378c86a15fcf1f0cf6243782"
        primary key ("sourceId", "destinationId")
);

alter table nearby_airport owner to postgres;

