-- Revert oblog:constraints from pg
BEGIN;

ALTER TABLE "category"
DROP CONSTRAINT "route_check";

ALTER TABLE "post"
DROP CONSTRAINT "slug_check";

COMMIT;