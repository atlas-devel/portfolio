ALTER TABLE "Project" ADD COLUMN "displayOrder" INTEGER NOT NULL DEFAULT 1000;
ALTER TABLE "Certificate" ADD COLUMN "displayOrder" INTEGER NOT NULL DEFAULT 1000;

WITH ordered_projects AS (
  SELECT "id", ROW_NUMBER() OVER (ORDER BY "createdAt" DESC, "id") AS position
  FROM "Project"
)
UPDATE "Project" AS project
SET "displayOrder" = ordered_projects.position
FROM ordered_projects
WHERE project."id" = ordered_projects."id";

WITH ordered_certificates AS (
  SELECT "id", ROW_NUMBER() OVER (ORDER BY "createdAt" DESC, "id") AS position
  FROM "Certificate"
)
UPDATE "Certificate" AS certificate
SET "displayOrder" = ordered_certificates.position
FROM ordered_certificates
WHERE certificate."id" = ordered_certificates."id";
