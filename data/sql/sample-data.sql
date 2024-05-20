-- Add sample data
-- sample data : reservations table
INSERT INTO "public"."reservations" ("nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (2, 1, 'test@test.com', 'Étranger', 'None', 't', 'top');
INSERT INTO "public"."reservations" ("nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (2, 1, 'test@test.com', 'Étranger', 'None', 't', 'top');
INSERT INTO "public"."reservations" ("nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (2, 1, 'test@test.com', 'Étranger', 'None', 't', 'top');
INSERT INTO "public"."reservations" ("nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (2, 1, 'test@test.com', 'Étranger', 'None', 't', 'top');
INSERT INTO "public"."reservations" ("nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (2, 1, 'test@test.com', 'Étranger', 'None', 't', 'top');
INSERT INTO "public"."reservations" ("nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (1, 1, 'test@test.com', 'France', 'Ardèche', 't', 'None');
INSERT INTO "public"."reservations" ("nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (6, 1, 'test@test.com', 'France', 'Aveyron', 't', 'None');
INSERT INTO "public"."reservations" ("nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (13, 13, 'test@test.com', 'Étranger', 'None', 't', 'cool');
INSERT INTO "public"."reservations" ("nb_tents", "nb_people", "email", "fr_or_foreign", "department", "itinerance", "quizz_note") VALUES (7, 1, 'test@test.com', 'Étranger', 'None', 't', 'cool');
-- sample data : reservations_locations table
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000A0EA1A405099BE4B19E04640', 1, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000A0EA1A405099BE4B19E04640', 2, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000A0EA1A405099BE4B19E04640', 3, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000A0EA1A405099BE4B19E04640', 4, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000A0EA1A405099BE4B19E04640', 5, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000088C9DE1A40EFBCC23302E34640', 6, '2024/05/18', 'Aire de bivouac de la Giettaz');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000A1341B40791A8B8501F74640', 6, '2024/05/19', 'Forêt de Carlaveyron');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E6100000000000003F5A1B40154DF770C9F94640', 6, '2024/05/20', 'Envers des Aiguilles Rouges');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E61000000100000054EB1A408520BAB070E04640', 7, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E61000000100000024751B4066DEC30748FF4640', 7, '2024/05/19', 'Vallon de Bérard');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E61000000100000044911B402391601BF0FD4640', 7, '2024/05/20', 'Lac Blanc');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E6100000010000004CE41A40D9DBBA4A51E04640', 8, '2024/05/18', 'Les Lacs Jovet');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000000F23D1B4024E0D091E4F64640', 8, '2024/05/19', 'Plateau de Carlaveyron');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E61000000100000016A11B40468D24A6DFFF4640', 8, '2024/05/20', 'Remuaz');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E61000000100000062A01B40AB24FD96ACFF4640', 9, '2024/05/20', 'Remuaz');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E6100000A9A61963B04D1B403A2DA5E755F64640', 9, '2024/05/19', 'Col de Bellachat et lac du Brévent');
INSERT INTO "public"."reservations_locations" ("geom" , "reservation", "date", "name_bivouac_zoning") VALUES ('0101000020E610000001000080F3521B406A0633E1B8F64640', 8, '2024/05/18', 'Col de Bellachat et lac du Brévent');
