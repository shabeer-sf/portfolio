/*
  Warnings:

  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `longDescription` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContactPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNING', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'MOBILE', 'DESIGN', 'TOOLS', 'SOFT_SKILLS', 'OTHER');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProjectCategory" ADD VALUE 'FULLSTACK';
ALTER TYPE "ProjectCategory" ADD VALUE 'API';
ALTER TYPE "ProjectCategory" ADD VALUE 'DATABASE';
ALTER TYPE "ProjectCategory" ADD VALUE 'DEVOPS';

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'MODERATOR';

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "priority" "ContactPriority" NOT NULL DEFAULT 'NORMAL',
ADD COLUMN     "source" VARCHAR(50),
ADD COLUMN     "subject" VARCHAR(100);

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "achievements" TEXT[],
ADD COLUMN     "companyLogo" VARCHAR(255),
ADD COLUMN     "department" VARCHAR(100),
ADD COLUMN     "projects" TEXT[],
ADD COLUMN     "teamSize" INTEGER,
ADD COLUMN     "website" VARCHAR(255);

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "about" TEXT,
ADD COLUMN     "availability" VARCHAR(100),
ADD COLUMN     "coverImageUrl" VARCHAR(255),
ADD COLUMN     "hourlyRate" VARCHAR(50),
ADD COLUMN     "interests" TEXT[],
ADD COLUMN     "languages" JSONB,
ADD COLUMN     "tagline" VARCHAR(200),
ADD COLUMN     "timezone" VARCHAR(50),
ADD COLUMN     "tools" TEXT[],
ADD COLUMN     "yearsExperience" INTEGER;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
ADD COLUMN     "challenges" TEXT[],
ADD COLUMN     "client" VARCHAR(100),
ADD COLUMN     "content" TEXT,
ADD COLUMN     "demoUrl" VARCHAR(255),
ADD COLUMN     "duration" VARCHAR(50),
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "learnings" TEXT[],
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "longDescription" TEXT NOT NULL,
ADD COLUMN     "problem" TEXT,
ADD COLUMN     "results" TEXT,
ADD COLUMN     "role" VARCHAR(100),
ADD COLUMN     "shortDescription" VARCHAR(200) NOT NULL,
ADD COLUMN     "slug" VARCHAR(100) NOT NULL,
ADD COLUMN     "solution" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'COMPLETED',
ADD COLUMN     "teamSize" INTEGER,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "deliverables" TEXT[],
ADD COLUMN     "duration" VARCHAR(50),
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pricing" TEXT,
ADD COLUMN     "process" TEXT[],
ADD COLUMN     "shortDescription" VARCHAR(200) NOT NULL,
ADD COLUMN     "slug" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "SocialLink" ADD COLUMN     "color" VARCHAR(20),
ADD COLUMN     "username" VARCHAR(100);

-- CreateTable
CREATE TABLE "ProjectTag" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "color" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "institution" VARCHAR(100) NOT NULL,
    "degree" VARCHAR(100) NOT NULL,
    "field" VARCHAR(100) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "gpa" VARCHAR(10),
    "description" TEXT,
    "achievements" TEXT[],
    "coursework" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "issuer" VARCHAR(100) NOT NULL,
    "credentialId" VARCHAR(100),
    "url" VARCHAR(255),
    "image" VARCHAR(255),
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "skills" TEXT[],
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "role" VARCHAR(100) NOT NULL,
    "company" VARCHAR(100) NOT NULL,
    "image" VARCHAR(255),
    "content" TEXT NOT NULL,
    "rating" INTEGER DEFAULT 5,
    "projectId" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "excerpt" VARCHAR(300) NOT NULL,
    "content" TEXT NOT NULL,
    "featuredImage" VARCHAR(255),
    "images" TEXT[],
    "tags" TEXT[],
    "category" VARCHAR(50) NOT NULL,
    "readTime" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "category" "SkillCategory" NOT NULL,
    "level" "SkillLevel" NOT NULL DEFAULT 'INTERMEDIATE',
    "years" INTEGER,
    "icon" VARCHAR(255),
    "color" VARCHAR(20),
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "page" VARCHAR(100) NOT NULL,
    "event" VARCHAR(100) NOT NULL,
    "data" JSONB,
    "userAgent" TEXT,
    "ipAddress" VARCHAR(45),
    "referrer" VARCHAR(255),
    "sessionId" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tags" TEXT[],
    "source" VARCHAR(50),
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToProjectTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectToProjectTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTag_name_key" ON "ProjectTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_email_key" ON "Newsletter"("email");

-- CreateIndex
CREATE INDEX "_ProjectToProjectTag_B_index" ON "_ProjectToProjectTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToProjectTag" ADD CONSTRAINT "_ProjectToProjectTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToProjectTag" ADD CONSTRAINT "_ProjectToProjectTag_B_fkey" FOREIGN KEY ("B") REFERENCES "ProjectTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
