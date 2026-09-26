ALTER TABLE "Project" ADD COLUMN "role" TEXT NOT NULL DEFAULT '';

UPDATE "Project"
SET "role" = CASE
  WHEN LOWER("projectName") LIKE '%fast2hire%' THEN 'Frontend Developer Team Lead'
  WHEN LOWER("projectName") LIKE '%bobo250%' THEN 'Frontend Developer Intern'
  WHEN LOWER("projectName") LIKE '%urugo%' THEN 'Co-Founder & CTO · Frontend Developer'
  WHEN LOWER("projectName") LIKE '%9call%' THEN 'Co-Founder & CTO · Frontend Developer'
  ELSE "role"
END
WHERE LOWER("projectName") LIKE '%fast2hire%'
   OR LOWER("projectName") LIKE '%bobo250%'
   OR LOWER("projectName") LIKE '%urugo%'
   OR LOWER("projectName") LIKE '%9call%';
