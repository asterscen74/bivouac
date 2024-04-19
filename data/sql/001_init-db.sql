-- Extensions
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tables
CREATE TABLE IF NOT EXISTS public.reservations
(
    id SERIAL PRIMARY KEY,
    nom text COLLATE pg_catalog."default",
    prenom text COLLATE pg_catalog."default",
    nb_places integer,
    lon numeric(10,5),
    lat numeric(10,5),
    geom geometry(Point,3857),
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.reservations OWNER to postgres;
