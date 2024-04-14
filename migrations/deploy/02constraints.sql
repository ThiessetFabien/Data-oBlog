-- Deploy oblog:constraints to pg

BEGIN;

ALTER TABLE "category"
    ADD CONSTRAINT "route" check (route ~ '[a-z0-9-]*$');

ALTER TABLE "post"
    ADD CONSTRAINT "slug" check (slug ~ '[a-z0-9-]*$');

COMMIT;
