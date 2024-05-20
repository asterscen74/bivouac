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

-- Add sample data
-- sample data : reservations table
INSERT INTO "public"."reservations" ("id", "nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (1, 2, 1, 'test@test.com', 'Étranger', 'None', 't', 'top');
INSERT INTO "public"."reservations" ("id", "nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (2, 2, 1, 'test@test.com', 'Étranger', 'None', 't', 'top');
INSERT INTO "public"."reservations" ("id", "nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (3, 2, 1, 'test@test.com', 'Étranger', 'None', 't', 'top');
INSERT INTO "public"."reservations" ("id", "nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (4, 2, 1, 'test@test.com', 'Étranger', 'None', 't', 'top');
INSERT INTO "public"."reservations" ("id", "nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (5, 2, 1, 'test@test.com', 'Étranger', 'None', 't', 'top');
INSERT INTO "public"."reservations" ("id", "nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (6, 1, 1, 'test@test.com', 'France', 'Ardèche', 't', 'None');
INSERT INTO "public"."reservations" ("id", "nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (7, 6, 1, 'test@test.com', 'France', 'Aveyron', 't', 'None');
INSERT INTO "public"."reservations" ("id", "nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (9, 13, 13, 'test@test.com', 'Étranger', 'None', 't', 'cool');
INSERT INTO "public"."reservations" ("id", "nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (8, 7, 1, 'test@test.com', 'Étranger', 'None', 't', 'cool');
-- sample data : reservations_locations table
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000A0EA1A405099BE4B19E04640', 1, 1, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000A0EA1A405099BE4B19E04640', 4, 2, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000A0EA1A405099BE4B19E04640', 7, 3, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000A0EA1A405099BE4B19E04640', 10, 4, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000A0EA1A405099BE4B19E04640', 13, 5, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000088C9DE1A40EFBCC23302E34640', 16, 6, '2024/05/18', 'Aire de bivouac de la Giettaz');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000A1341B40791A8B8501F74640', 17, 6, '2024/05/19', 'Forêt de Carlaveyron');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E6100000000000003F5A1B40154DF770C9F94640', 18, 6, '2024/05/20', 'Envers des Aiguilles Rouges');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E61000000100000054EB1A408520BAB070E04640', 19, 7, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E61000000100000024751B4066DEC30748FF4640', 20, 7, '2024/05/19', 'Vallon de Bérard');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E61000000100000044911B402391601BF0FD4640', 21, 7, '2024/05/20', 'Lac Blanc');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E6100000010000004CE41A40D9DBBA4A51E04640', 22, 8, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000F23D1B4024E0D091E4F64640', 23, 8, '2024/05/19', 'Plateau de Carlaveyron');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E61000000100000016A11B40468D24A6DFFF4640', 24, 8, '2024/05/20', 'Remuaz');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E61000000100000062A01B40AB24FD96ACFF4640', 27, 9, '2024/05/20', 'Remuaz');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E6100000A9A61963B04D1B403A2DA5E755F64640', 26, 9, '2024/05/19', 'Col de Bellachat et lac du Brévent');
INSERT INTO "public"."reservations_locations" ("geom" , "id", "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000080F3521B406A0633E1B8F64640', 25, 8, '2024/05/18', 'Col de Bellachat et lac du Brévent');

-- Triggers
CREATE TRIGGER reservations_locations_bivouac_zoning
BEFORE INSERT ON reservations_locations
FOR EACH ROW
EXECUTE FUNCTION retrieve_name_bivouac_zoning();
