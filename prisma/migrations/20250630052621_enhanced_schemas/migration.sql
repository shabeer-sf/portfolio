/*
  Warnings:

  - You are about to drop the `_ProjectToProjectTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToProjectTag" DROP CONSTRAINT "_ProjectToProjectTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToProjectTag" DROP CONSTRAINT "_ProjectToProjectTag_B_fkey";

-- DropTable
DROP TABLE "_ProjectToProjectTag";

-- CreateTable
CREATE TABLE "ProjectOnTag" (
    "projectId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ProjectOnTag_pkey" PRIMARY KEY ("projectId","tagId")
);

-- AddForeignKey
ALTER TABLE "ProjectOnTag" ADD CONSTRAINT "ProjectOnTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectOnTag" ADD CONSTRAINT "ProjectOnTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "ProjectTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
