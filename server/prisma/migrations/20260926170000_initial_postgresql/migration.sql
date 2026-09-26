CREATE SCHEMA IF NOT EXISTS "public";
CREATE TYPE "ProjectStatus" AS ENUM ('dev', 'live', 'dep-local');
CREATE TABLE "adminAuth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "adminAuth_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "imageFile" TEXT NOT NULL,
    "githubLink" TEXT NOT NULL,
    "liveLink" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "techs" TEXT[],
    "status" "ProjectStatus" NOT NULL DEFAULT 'dev',
    "isLive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "VisitCounter" (
    "id" TEXT NOT NULL,
    "dateKey" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "VisitCounter_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "VisitEvent" (
    "id" TEXT NOT NULL,
    "dateKey" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL DEFAULT '',
    "userAgent" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "VisitEvent_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "adminAuth_email_key" ON "adminAuth"("email");
CREATE UNIQUE INDEX "VisitCounter_dateKey_key" ON "VisitCounter"("dateKey");
CREATE INDEX "VisitEvent_dateKey_idx" ON "VisitEvent"("dateKey");
CREATE INDEX "VisitEvent_fingerprint_idx" ON "VisitEvent"("fingerprint");
CREATE UNIQUE INDEX "VisitEvent_dateKey_fingerprint_key" ON "VisitEvent"("dateKey", "fingerprint");
