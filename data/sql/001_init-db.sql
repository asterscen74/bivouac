-- Extensions
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tables
CREATE TABLE IF NOT EXISTS public.reservations
(
    id SERIAL PRIMARY KEY,
    date date,
    nb_tents integer,
    nb_people integer,
    email text,
    fr_or_foreign text,
    department text,
    itinerance boolean,
    lon numeric(10,5),
    lat numeric(10,5),
    geom geometry(Point,3857)
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.reservations OWNER to postgres;