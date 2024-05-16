-- Extensions
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tables
CREATE TABLE IF NOT EXISTS public.reservations
(
    id SERIAL PRIMARY KEY,
    nb_tents integer,
    nb_people integer,
    email text,
    fr_or_foreign text,
    department text,
    itinerance boolean
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.reservations OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.reservations_locations
(
    id SERIAL PRIMARY KEY,
    reservation int,
    date date,
    geom geometry(Point,4326),
    CONSTRAINT fk_reservation
      FOREIGN KEY(reservation)
        REFERENCES reservations(id)
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.reservations OWNER to postgres;
