-- Revert oblog:01createdb from pg
BEGIN;

DROP TABLE post;

DROP TABLE category;

COMMIT;