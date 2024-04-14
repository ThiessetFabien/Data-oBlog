-- Deploy oblog:01createdb to pg
BEGIN;

CREATE TABLE
    "category" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "route" TEXT NOT NULL UNIQUE,
        "label" TEXT NOT NULL UNIQUE,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT (now ()),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    "post" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "slug" TEXT NOT NULL UNIQUE,
        "title" TEXT NOT NULL UNIQUE,
        "excerpt" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "category_id" INT NOT NULL REFERENCES "category" ("id"),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT (now ()),
        "updated_at" TIMESTAMPTZ
    );

COMMIT;