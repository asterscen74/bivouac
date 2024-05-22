-- Extensions
CREATE EXTENSION IF NOT EXISTS postgis;

-- Fonctions
CREATE OR REPLACE FUNCTION retrieve_name_bivouac_zoning() RETURNS TRIGGER AS $$
DECLARE
    name_bivouac_zoning TEXT;
BEGIN

	  SELECT nom INTO name_bivouac_zoning
    FROM zonage_bivouac
    WHERE ST_Within(NEW.geom, zonage_bivouac.geom)
    LIMIT 1;

    NEW.name_bivouac_zoning = name_bivouac_zoning;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tables
CREATE TABLE IF NOT EXISTS public.reservations
(
    id SERIAL PRIMARY KEY,
    nb_tents integer,
    nb_people integer,
    email text,
    fr_or_foreign text,
    department text,
    itinerance boolean,
    quizz_note text
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.reservations OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.reservations_locations
(
    id SERIAL PRIMARY KEY,
    reservation int,
    date date,
    geom geometry(Point,4326),
    name_bivouac_zoning text,
    CONSTRAINT fk_reservation
      FOREIGN KEY(reservation)
        REFERENCES reservations(id)
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.reservations OWNER to postgres;

-- Triggers
DROP TRIGGER IF EXISTS reservations_locations_bivouac_zoning ON public.reservations_locations;
CREATE TRIGGER reservations_locations_bivouac_zoning
BEFORE INSERT ON reservations_locations
FOR EACH ROW
EXECUTE FUNCTION retrieve_name_bivouac_zoning();
